import { useEffect, useState } from "react";

function useForm(initial, checks, onSubmit) {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  function validate(inp) {
    const err = {};
    let errorExists = false;

    for (let name in checks) {
      const checker = checks[name];
      const value = inputs[name];
      const error = checker(value);

      if (error) {
        err[name] = error;
        errorExists = true;
      }
    }

    return errorExists;
  }

  useEffect(() => {
    const inp = initial;
    const err = validate(initial);
    setInputs(inp);
    setErrors(err);
  });

  function handleChange(name, value) {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checks[name](value) });
  }

  function handleSubmit() {
    const errorExists = validate(inputs);
    if (errorExists) return;

    onSubmit()
      .then(() => setStatus("success"))
      .catch(() => setStatus("failure"))
      .finally(() => setLoading(false));
  }

  return [inputs, errors, loading, status, handleChange, handleSubmit];
}

export default useForm;
