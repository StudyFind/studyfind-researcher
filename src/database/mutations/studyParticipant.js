import { firestore } from "database/firebase";

const getStudyParticipantRef = (studyID, participantID) => {
  return firestore
    .collection("studies")
    .doc(studyID)
    .collection("participants")
    .doc(participantID);
};

const updateParticipantStatus = (studyID, participantID, { status }) => {
  return getStudyParticipantRef(studyID, participantID).update({ status });
};

const updateParticipantName = (studyID, participantID, { name }) => {
  console.log(studyID, participantID, name)
}

export const studyParticipant = {
  updateStatus: updateParticipantStatus,
  updateName: updateParticipantName
};
