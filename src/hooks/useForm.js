import { useState, useEffect } from "react";

function useForm(initial, checker, validate) {
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState(validate(initial));

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  useEffect(() => {
    setInputs(initial);
    setErrors(validate(initial));
  }, [initial]);

  return [inputs, errors, setInputs, setErrors, handleChange];
}
