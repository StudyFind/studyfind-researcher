import { auth, firestore } from "./firebase";
import axios from "axios";

const CLOUD_API_URL = "https://us-central1-studyfind-researcher.cloudfunctions.net";
const STUDY_API_URL = `${CLOUD_API_URL}/studies`;

const studyFunc = (params, endpoint) =>
  new Promise((resolve, reject) =>
    auth.currentUser
      .getIdToken(false)
      .then((idToken) =>
        axios.get(`${STUDY_API_URL}/${endpoint}`, { params: { ...params, idToken } })
      )
      .then(({ data: { error } }) => (!error ? resolve() : reject(error)))
  );

const welcomeAccount = () => studyFunc({}, "welcomeAccount");
const makeStudy = (nctID) => studyFunc({ nctID }, "makeStudy");
const resetStudy = (nctID) => studyFunc({ nctID }, "resetStudy");

const updateStudy = (id, study) => firestore.collection("studies").doc(id).update(study);
const deleteStudy = (nctID) => firestore.collection("studies").doc(nctID).delete();

export { welcomeAccount, makeStudy, resetStudy, updateStudy, deleteStudy };
