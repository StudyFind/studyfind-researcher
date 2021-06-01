import { useState } from "react";
import { validate } from "functions";

function useAuthForm({ initial, onSubmit }) {
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  const check = (name, value) => {
    if (name === "email") return validate.email(value);
    if (name === "password") return validate.password(value);
    if (name === "newPassword") return validate.password(value);
  };

  const getErrors = (inputs) => {
    const err = {};

    for (const name in inputs) {
      err[name] = check(name, inputs[name]);
    }

    return err;
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: check(name, value) });
  };

  const handleSubmit = async (...params) => {
    const err = getErrors(inputs);

    if (Object.keys(err).some((v) => err[v])) {
      setErrors(err);
      return;
    }

    setLoading(true);

    try {
      await onSubmit(...params);
      setSuccess(true);
    } catch (err) {
      setErrors(err);
      setSuccess(false);
    } finally {
      setLoading(false);
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }
  };

  return { inputs, errors, loading, success, handleChange, handleSubmit };
}

export default useAuthForm;
