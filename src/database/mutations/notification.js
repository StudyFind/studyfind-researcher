import { firestore } from "database/firebase";

export const notification = {
  read: (notificationID) => {
    return firestore
      .collection("notifications")
      .doc(notificationID)
      .update({ read: true });
  },
};
