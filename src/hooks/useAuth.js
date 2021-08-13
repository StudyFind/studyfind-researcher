import { useState } from "react";
import { validate, object } from "utils";

function useAuth(initial, onSubmit) {
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState(initial);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const check = (name, value) => {
    if (name === "name") return value ? "" : " ";
    if (name === "email") return validate.email(value);
    if (name === "password") return validate.password(value);
    if (name === "newPassword") return validate.password(value);
  };

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };

  const handleSubmit = () => {
    const errorMessages = object.map(inputs, check);
    const errorExists = object.some(errorMessages);

    if (errorExists) {
      setErrors(errorMessages);
      return;
    }

    setLoading(true);

    onSubmit(inputs)
      .then(() => {
        setSuccess(true);
        setInputs(initial);
      })
      .catch((err) => {
        setSuccess(false);
        setErrors(err);
      })
      .finally(() => setLoading(false));
  };

  return { inputs, errors, loading, success, handleChange, handleSubmit };
}

export default useAuth;
