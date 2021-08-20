import { firestore } from "database/firebase";

export const researcherQuery = (researcherID) => {
  return firestore.collection("researchers").doc(researcherID);
};

export const dashboardQuery = (researcherID) => {
  return firestore
    .collection("studies")
    .where("researcher.id", "==", researcherID)
    .orderBy("createdAt", "desc");
};
