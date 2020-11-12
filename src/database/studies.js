import { auth, firestore } from "./firebase";

const map = (snapshot) => {
  const collection = [];
  snapshot.forEach((doc) => collection.push(doc.data()));
  return collection;
};

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

export { fetchStudy, fetchStudies, fetchStudiesWhere, updateStudy, deleteStudy };
