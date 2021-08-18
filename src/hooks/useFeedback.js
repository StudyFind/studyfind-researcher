import { useState } from "react";
import { auth, firestore } from "database/firebase";
import moment from "moment";

function useFeedback() {
  const [values, setValues] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });

  const validate = ({ title, body }) => ({
    title: !title,
    body: !body,
  });

  const handleSubmit = async ({ title, body }) => {
    const err = validate({ title, body });

    if (err.title || err.body) {
      setErrors(err);
    }

    const email = auth.currentUser.email;
    const time = moment().valueOf();
    const side = "researcher";

    await firestore.collection("feedback").add({ title, body, email, time, side });
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  return [values, errors, handleChange, handleSubmit];
}

export default useFeedback;
