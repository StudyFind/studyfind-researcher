const functions = require("firebase-functions");
const axios = require("axios");

const verifyIdToken = require("./utils/verify-id-token");
const getUser = require("./utils/get-user");
const addFirestoreEntry = require("./utils/add-firestore-entry");

// fetches currently authenticated user
async function fetchUser(auth, idToken) {
  try {
    const decodedToken = await verifyIdToken(auth, idToken);
    const user = await getUser(auth, decodedToken.uid);
    return user;
  } catch (error) {
    throw Error(`parameter idToken '${idToken}' is not a valid firebase user token: ${error}`);
  }
}

// fetches study by nctID using flask API
async function fetchStudy(nctID) {
  const API = "https://flask-fire-27eclhhcra-uc.a.run.app/autoFillStudy";
  const { data } = await axios.get(`${API}?nctID=${nctID}`);

  if (!data || data.status === "failure") {
    throw Error(`parameter nctID '${nctID}' is likely invalid`);
  }

  return data.study;
}

// checks that study email matches user email
function checkOwnership(data, user) {
  const userEmail = user.email.toLowerCase();
  const studyEmail = data.contactEmail.toLowerCase();

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
  let type = "Inclusion";
  data.questions = data.additionalCriteria
    .split("\n")
    .map((prompt) => {
      if (prompt.trim() === "") return null;

      const norm = prompt.toLowerCase();
      if (norm.includes("exclusion")) {
        type = "Exclusion";
        return null;
      }
      if (norm.includes("criteria")) return null;
      if (norm.includes("following")) return null;

      return { type, prompt };
    })
    .filter((i) => i !== null);

  return data;
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

  // try {
  //   const [data, user] = Promise.all([fetchStudy(nctID), fetchUser(auth, idToken)]);

  //   const uid = checkOwnership(data, user);
  //   const questions = generateQuestions(data);
  //   const study = generateStudyFromData(data);

  //   study.questions = questions;
  //   study.researcher.uid = uid;

  //   writeToFirestore(firestore, nctID, study);

  //   res.json({ study, error: null });
  // } catch (error) {
  //   res.json({ study: null, error: error.toString() });
  // }

  return Promise.all([fetchStudy(nctID), fetchUser(auth, idToken)])
    .then(([data, user]) => checkOwnership(data, user))
    .then((data) => generateQuestions(data))
    .then((data) => generateStudyFromData(data))
    .then((study) => writeToFirestore(firestore, nctID, study))
    .then((study) => res.json({ study, nctID, error: null }))
    .catch((err) => res.json({ study: null, error: err.toString() }));
};
