const functions = require("firebase-functions");
const axios = require("axios");

const verifyIdToken = require("./firebase/verify-id-token");
const getUser = require("./firebase/get-user");
const addFirestoreEntry = require("./firebase/add-firestore-entry");

const generateSurvey = require("./utils/generate-survey");

// fetches currently authenticated user
async function fetchUser(auth, idToken) {
  try {
    const decodedToken = await verifyIdToken(auth, idToken);
    const user = await getUser(auth, decodedToken.uid);
    return user;
  } catch (error) {
    throw Error("User is not authenticated");
  }
}

// fetches study by nctID using flask API
async function fetchStudy(nctID) {
  const { data } = await axios.get(
    `https://flask-fire-27eclhhcra-uc.a.run.app/autoFillStudy?nctID=${nctID}`
  );

  if (!data || data.status === "failure") {
    throw Error("Parameter is invalid");
  }

  return data.study;
}

// checks that study email matches user email
function checkOwnership(data, user) {
  const userEmail = user.email.toLowerCase();
  const studyEmail = data.contactEmail.toLowerCase();

  // ***** NOTE: ********************* //
  // ***** COMMENTED FOR TESTING ***** //

  // if (userEmail !== studyEmail) {
  //   throw Error(
  //     `user email '${user.email}' does not match study contact email '${data.contactEmail}'; ownership cannot be verified`
  //   );
  // }

  data.uid = user.uid;
  return data;
}

// generates survey questions from inclusion and exclusion criteria
function generateQuestions(data) {
  const { inclusion, exclusion } = generateSurvey(data.additionalCriteria);
  const inclusionList = inclusion.map((prompt) => ({ type: "Inclusion", prompt }));
  const exclusionList = exclusion.map((prompt) => ({ type: "Exclusion", prompt }));
  const criterionList = inclusionList.concat(exclusionList);
  return { ...data, questions: criterionList };
}

// returns default entry from given data/user combo. Designed to be adjustable
// @param data <obj> - data object scraped from nct website by flask app
// @param user <obj> - firebase user object authoring this study
function generateStudyFromData(data) {
  return {
    published: false,
    activated: false,
    updatedAt: Date.now(),
    nctID: data.nctID,
    title: data.title,
    status: data.recruitmentStatus,
    description: data.shortDescription,
    researcher: {
      id: data.uid,
      name: data.contactName,
      email: data.contactEmail,
    },
    sex: data.sex,
    age: `${data.minAge}-${data.maxAge}`,
    control: data.control,
    questions: data.questions,
    locations: data.locations,
    conditions: data.conditions,
  };
}

// saves study as a new document to firestore
async function writeToFirestore(firestore, nctID, study) {
  await addFirestoreEntry({
    firestore,
    collection: "studies",
    document: nctID,
    data: study,
  });
  return study;
}

// Take the nctID text parameter passed to this HTTP endpoint and use flask api to scrape
// its data, create a default unpublished study, and return the data
module.exports = ({ admin }) => async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const { nctID, idToken } = req.query;

  if (!nctID) return res.json({ error: "parameter nctID needs to be defined" });
  if (!idToken) return res.json({ error: "parameter idToken needs to be defined" });

  const auth = admin.auth();
  const firestore = admin.firestore();

  return Promise.all([fetchStudy(nctID), fetchUser(auth, idToken)])
    .then(([data, user]) => checkOwnership(data, user))
    .then((data) => generateQuestions(data))
    .then((data) => generateStudyFromData(data))
    .then((study) => writeToFirestore(firestore, nctID, study))
    .then((study) => res.json({ study, nctID, error: null }))
    .catch((err) => res.json({ study: null, error: err.toString() }));
};
