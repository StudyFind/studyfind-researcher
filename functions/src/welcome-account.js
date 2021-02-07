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

module.exports = async ({ admin }, { uid, email }) => {
  const firestore = admin.firestore();
  const studies = await fetchStudiesByEmail(email);

  const formatted = studies.map((study) => {
    const questions = generateQuestions(study);
    return cleanStudy({ ...study, uid, questions });
  });

  await Promise.all(formatted.map((study) => writeToFirestore(firestore, study.nctID, study)));
};
