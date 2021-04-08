import { auth, firestore } from "database/firebase";
import moment from "moment";

const validate = ({ title, body }) => {
  return {
    title: !title,
    body: !body,
  };
};

const createFeedback = async ({ title, body }) => {
  const errors = validate({ title, body });

  if (errors.title || errors.body) {
    throw errors;
  }

  const email = auth.currentUser.email;
  const time = moment().valueOf();
  const side = "researcher";

  await firestore.collection("feedback").add({ title, body, email, time, side });
};

export { createFeedback };
