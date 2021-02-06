import { auth, firestore } from "./firebase";
import axios from "axios";

const FLASK_API_URL = "https://us-central1-studyfind-researcher.cloudfunctions.net";
const STUDY_API_URL = `${FLASK_API_URL}/studies`;

const studyFunc = (nctID, endpoint) =>
  new Promise((resolve, reject) =>
    auth.currentUser
      .getIdToken(false)
      .then((idToken) => axios.get(`${STUDY_API_URL}/${endpoint}`, { params: { nctID, idToken } }))
      .then(({ data: { study, error } }) => (study ? resolve(study) : reject(error)))
  );

const makeStudy = (nctID) => studyFunc(nctID, "makeStudy");
const resetStudy = (nctID) => studyFunc(nctID, "resetStudy");
const updateStudy = (id, study) => firestore.collection("studies").doc(id).update(study);
const deleteStudy = (nctID) => firestore.collection("studies").doc(nctID).delete();

export { makeStudy, resetStudy, updateStudy, deleteStudy };
