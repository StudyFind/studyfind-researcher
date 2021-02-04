import { auth, firestore } from "./firebase";
import axios from "axios";

const makeStudy = (nctID) =>
  new Promise((resolve, reject) => {
    return auth.currentUser
      .getIdToken(false)
      .then((idToken) =>
        axios.get("https://us-central1-studyfind-researcher.cloudfunctions.net/studies/makeStudy", {
          params: { nctID, idToken },
        }),
      )
      .then(({ data }) => {
        const { study, error } = data;

        if (study) {
          resolve(study);
        } else {
          reject(error);
        }
      });
  });

const resetStudy = (nctID) => {
  return auth.currentUser
    .getIdToken(false)
    .then((idToken) =>
      axios.get("https://us-central1-studyfind-researcher.cloudfunctions.net/studies/resetStudy", {
        params: { nctID, idToken },
      }),
    )
    .then(({ data }) => data);
};

const updateStudy = (id, study) => firestore.collection("studies").doc(id).update(study);
const deleteStudy = (nctID) => firestore.collection("studies").doc(nctID).delete();

export { makeStudy, resetStudy, updateStudy, deleteStudy };
