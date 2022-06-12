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

const updateFakename = (studyID, participantID, { fakename }) => {
  return getStudyParticipantRef(studyID, participantID).update({ fakename });
};

export const studyParticipant = {
  updateStatus: updateParticipantStatus,
  updateFakename: updateFakename,
};
