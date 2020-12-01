import { auth, firestore } from "./firebase";
import axios from "axios";

const map = (snapshot) => {
  const collection = [];
  snapshot.forEach((doc) => collection.push(doc.data()));
  return collection;
};

const makeStudy = (nctID) => {
  return auth.currentUser
    .getIdToken(false)
    .then((idToken) => axios.get(
      "https://us-central1-studyfind-researcher.cloudfunctions.net/studies/makeStudy",
      {
        params: { nctID, idToken }
      }
    ))
    .then(({ data }) => data);
}

const updateStudy = (nctID) => {
  return auth.currentUser
    .getIdToken(false)
    .then((idToken) => axios.get(
      "https://us-central1-studyfind-researcher.cloudfunctions.net/studies/updateStudy",
      {
        params: { nctID, idToken }
      }
    ))
    .then(({ data }) => data);
}

const fetchStudy = async (nctID) => {
  const document = await firestore.collection("studies").doc(nctID).get();
  return document.data();
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

const updateStudy = (study) => firestore.collection("studies").doc(study.nctID).update(study);
const deleteStudy = (nctID) => firestore.collection("studies").doc(nctID).delete();

export { makeStudy, updateStudy, fetchStudy, fetchStudies, fetchStudiesWhere, updateStudy, deleteStudy };
