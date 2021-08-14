import { auth, firestore } from "database/firebase";

export const notification = {
  read: (notificationID) => {
    return firestore
      .collection("researchers")
      .doc(auth.currentUser.uid)
      .collection("notifications")
      .doc(notificationID)
      .update({ read: true });
  },
};
