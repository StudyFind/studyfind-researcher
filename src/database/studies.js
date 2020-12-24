import { auth, firestore } from "./firebase";
import axios from "axios";

const makeStudy = (nctID) => {
  return auth.currentUser
    .getIdToken(false)
    .then((idToken) =>
      axios.get("https://us-central1-studyfind-researcher.cloudfunctions.net/studies/makeStudy", {
        params: { nctID, idToken },
      })
    )
    .then(({ data }) => data);
};

const resetStudy = (nctID) => {
  return auth.currentUser
    .getIdToken(false)
    .then((idToken) =>
      axios.get("https://us-central1-studyfind-researcher.cloudfunctions.net/studies/resetStudy", {
        params: { nctID, idToken },
      })
    )
    .then(({ data }) => data);
};

const updateStudy = (study) => firestore.collection("studies").doc(study.id).update(study);
const deleteStudy = (nctID) => firestore.collection("studies").doc(nctID).delete();

export { makeStudy, resetStudy, updateStudy, deleteStudy };
