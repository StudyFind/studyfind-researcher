import { firestore } from "database/firebase";

export const buildResearcherQuery = (researcherID) => {
  return firestore.collection("researchers").doc(researcherID);
};

export const buildDashboardQuery = (researcherID) => {
  return firestore
    .collection("studies")
    .where("researcher.id", "==", researcherID)
    .orderBy("createdAt", "desc");
};
