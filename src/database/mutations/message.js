import { firestore } from "database/firebase";
import { getNow, getUID } from "database/getters";

const getMessagesRef = (studyID, participantID) => {
  return firestore
    .collection("studies")
    .doc(studyID)
    .collection("participants")
    .doc(participantID)
    .collection("messages");
};

const getMessageRef = (studyID, participantID, messageID) => {
  return getMessagesRef(studyID, participantID).doc(messageID);
};

export const message = {
  send: (
    studyID,
    participantID,
    { text },
    hasAttachment = false,
    file = "",
    handleUpload = ""
  ) => {
    const now = getNow();
    return getMessagesRef(studyID, participantID)
      .add({
        text,
        time: now,
        user: getUID(),
        read: false,
        hasAttachment,
      })
      .then(() => {
        hasAttachment && handleUpload(now, file);
      });
  },

  read: (studyID, participantID, messageID) =>
    getMessageRef(studyID, participantID, messageID).update({
      read: true,
    }),
};
