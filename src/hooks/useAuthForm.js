import { useState } from "react";
import { validate } from "functions";

function useAuthForm(onSubmit) {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();

  const handleInput = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, [name]: validate.input(name, value) });
  };

  const handleSubmit = (...params) =>
    new Promise((resolve, reject) => {
      const err = validate.all(inputs);
      setErrors(err);

      if (Object.keys(err).some((v) => err[v])) {
        reject(err);
        return;
      }

      setLoading(true);
      onSubmit(...params)
        .then((data) => {
          setLoading(false);
          setSuccess(true);
          resolve(data);
        })
        .catch((error) => {
          setLoading(false);
          setErrors(error);
          setSuccess(false);
          reject(error);
        });
    });

  return { inputs, errors, loading, success, handleInput, handleSubmit };
}

export default useAuthForm;
