import { auth, firestore } from "database/firebase";
import axios from "axios";

const map = (snapshot) => {
  const collection = [];
  snapshot.forEach((doc) => collection.push({ id: doc.id, ...doc.data() }));
  return collection;
};

const makeStudy = (nctID) =>
  new Promise((resolve, reject) => {
    return auth.currentUser
      .getIdToken(false)
      .then((idToken) =>
        axios.get("https://us-central1-studyfind-researcher.cloudfunctions.net/studies/makeStudy", {
          params: { nctID, idToken },
        })
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
      })
    )
    .then(({ data }) => data);
};

const fetchStudy = async (nctID) => {
  const document = await firestore.collection("studies").doc(nctID).get();
  return { id: document.id, ...document.data() };
};

const fetchStudies = async () => {
  const { currentUser } = await auth;
  const snapshot = await firestore
    .collection("studies")
    .where("researcher.id", "==", currentUser.uid)
    .where("published", "==", true)
    .orderBy("updatedAt", "desc")
    .get();

  return map(snapshot);
};

const fetchStudiesWhere = async (field, relation, value) => {
  const snapshot = await firestore.collection("studies").where(field, relation, value).get();
  return map(snapshot);
};

const updateStudy = (study) => firestore.collection("studies").doc(study.id).update(study);
const deleteStudy = (nctID) => firestore.collection("studies").doc(nctID).delete();

export {
  makeStudy,
  resetStudy,
  fetchStudy,
  fetchStudies,
  fetchStudiesWhere,
  updateStudy,
  deleteStudy,
};
