import { useState } from "react";
import validator from "validator";

function useAuthForm({ initial, onSubmit }) {
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  const checker = (name, value) => {
    if (!value) return true;

    if (name === "email") {
      if (!validator.isEmail(value)) return "Email is invalid";
    }

    if (name === "password" || name === "newPassword") {
      const checkCase = value !== value.toLowerCase();
      const checkSize = value.length > 7;

      if (!value) return true;
      if (!checkSize) return "Password must have at least 8 characters";
      if (!checkCase) return "Password must have a capital letter";
    }

    return false;
  };

  const validate = (inputs) => {
    const err = {};

    for (const name in inputs) {
      err[name] = checker(name, inputs[name]);
    }

    return err;
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const handleSubmit = async (...params) => {
    const err = validate(inputs);

    if (Object.keys(err).some((v) => err[v])) {
      reject(err);
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
