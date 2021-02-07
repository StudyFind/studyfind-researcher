const getUserByToken = require("./firebase/get-user-by-token");
const fetchStudiesByEmail = require("./utils/fetch-studies-by-email");
const generateSurvey = require("./utils/generate-survey");
const cleanStudy = require("./utils/clean-study");
const addFirestoreEntry = require("./firebase/add-firestore-entry");

function generateQuestions(data) {
  const { inclusion, exclusion } = generateSurvey(data.additionalCriteria);
  const inclusionList = inclusion.map((prompt) => ({ type: "Inclusion", prompt }));
  const exclusionList = exclusion.map((prompt) => ({ type: "Exclusion", prompt }));
  const criterionList = inclusionList.concat(exclusionList);
  return { ...data, questions: criterionList };
}

async function writeToFirestore(firestore, nctID, study) {
  await addFirestoreEntry({
    firestore,
    collection: "studies",
    document: nctID,
    data: study,
  });
  return study;
}

module.exports = ({ admin }) => async (req, res) => {
  const { idToken } = req.query;

  const auth = admin.auth();
  const firestore = admin.firestore();
  const user = await getUserByToken(auth, idToken);
  const studies = await fetchStudiesByEmail(user.email);

  const formatted = studies.map((study) => {
    const { uid } = user;
    const questions = generateQuestions(study);
    return cleanStudy({ ...study, uid, questions });
  });

  await Promise.all(formatted.map((study) => writeToFirestore(firestore, study.nctID, study)));

  res.json({ studies: formatted, error: null });
};
