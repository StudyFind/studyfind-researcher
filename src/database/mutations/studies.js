import { auth, firestore } from "../firebase";
import axios from "axios";

const CLOUD_API_URL = "https://us-central1-studyfind-researcher.cloudfunctions.net";
const STUDY_API_URL = `${CLOUD_API_URL}/studies`;

const studyFunc = (params, endpoint) =>
  new Promise((resolve, reject) =>
    auth.currentUser
      .getIdToken(true)
      .then((idToken) =>
        axios.get(`${STUDY_API_URL}/${endpoint}`, { params: { ...params, idToken } })
      )
      .then(({ data: { error } }) => (!error ? resolve() : reject(error)))
  );

const welcomeAccount = () => studyFunc({}, "welcomeAccount");
const makeStudy = (studyID) => studyFunc({ studyID }, "makeStudy");
const resetStudy = (studyID) => studyFunc({ studyID }, "resetStudy");

const updateStudy = (id, study) => firestore.collection("studies").doc(id).update(study);
const deleteStudy = (studyID) => firestore.collection("studies").doc(studyID).delete();

export { welcomeAccount, makeStudy, resetStudy, updateStudy, deleteStudy };
