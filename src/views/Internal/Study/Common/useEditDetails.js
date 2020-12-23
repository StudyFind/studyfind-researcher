import { useState, useEffect } from "react";

function useEditDetails({ id, title, description, onCancel, onSubmit }) {
  const [inputs, setInputs] = useState({ title, description });
  const [errors, setErrors] = useState({});

  const characterLimits = (min, max, name, value) => {
    const length = value.length;
    const invalid = length < min || length > max;
    return invalid ? `The best ${name}s are between ${min} and ${max} characters` : "";
  };

  const check = {
    title: (value) => characterLimits(50, 100, "title", value),
    description: (value) => characterLimits(300, 500, "description", value),
  };

  const validate = (inp) => ({
    title: check.title(inp.title),
    description: check.description(inp.description),
  });

  useEffect(() => {
    if (id) {
      const inp = { title: title || "", description: description || "" };
      const err = validate(inp);
      setInputs(inp);
      setErrors(err);
    }
  }, [study]);

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: check[name](value) });
  };

  const handleCancel = () => {
    setInputs({ title, description });
    onCancel();
  };

  const handleSubmit = () => {
    const err = validate(inputs);
    setErrors(err);

    const errorExists = Object.keys(err).some((i) => err[i]);
    if (errorExists) return;

    onsubmit();
  };

  return [inputs, errors, handleChange, handleCancel, handleSubmit];
}

export default useEditDetails;
