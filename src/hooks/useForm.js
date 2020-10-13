import { useState, useEffect } from "react";

function useForm(initial) {
  const [inputs, setInputs] = useState(initial || {});
  const [errors, setErrors] = useState({});

  const setForm = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, [name]: validate(value.trim()) });
  };

  return [inputs, errors, setForm];
}
