import { useState } from "react";
import { validate, object } from "utils";

import useTriggerToast from "../useTriggerToast";

function useAuth({ initial, toasts, onSubmit }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const triggerToast = useTriggerToast();

  const check = (name, value) => {
    if (name === "name") return value ? "" : " ";
    if (name === "email") return validate.email(value);
    if (name === "password") return validate.password(value);
    if (name === "newPassword") return validate.password(value);
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };

  const handleSubmit = () => {
    const errorMessages = object.map(values, check);
    const errorExists = object.some(errorMessages);

    if (errorExists) {
      setErrors(errorMessages);
      return;
    }

    setLoading(true);

    return onSubmit(values)
      .then(() => {
        setSuccess(true);
        setValues(initial);

        if (toasts?.success) {
          triggerToast(toasts.success);
        }
      })
      .catch((err) => {
        setSuccess(false);
        setErrors(err);

        if (toasts?.failure) {
          triggerToast(toasts.failure);
        }
      })
      .finally(() => setLoading(false));
  };

  return { values, errors, loading, success, handleChange, handleSubmit };
}

export default useAuth;
