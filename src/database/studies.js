import { firestore } from "database/firebase";
import { createStudyCloud, updateStudyCloud, welcomeAccountCloud } from "database/cloud";

const makeStudy = (studyID) => createStudyCloud({ nctID: studyID });
const resetStudy = (studyID) => updateStudyCloud({ nctID: studyID });
const welcomeAccount = () => welcomeAccountCloud();
const updateStudy = (studyID, study) => firestore.collection("studies").doc(studyID).update(study);
const deleteStudy = (studyID) => firestore.collection("studies").doc(studyID).delete();

export { welcomeAccount, makeStudy, resetStudy, updateStudy, deleteStudy };
