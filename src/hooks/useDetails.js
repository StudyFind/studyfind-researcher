import { useState } from "react";
import { updateStudy } from "database/studies";
import lodash from "lodash";

function useDetails(initial) {
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState(validate(initial));

  const isDifferent = !lodash.isEqual(initial, inputs);

  const characterCheck = (name, value, min, max) => {
    const isInvalid = value.length < min || value.length > max;
    return isInvalid
      ? `Please ensure that the study ${name} is between ${min} and ${max} characters`
      : "";
  };

  const checker = (name, value) => {
    const [min, max] = {
      title: [50, 100],
      description: [300, 500],
    }[name];
    return characterCheck(name, value, min, max);
  };

  const validate = ({ title, description }) => ({
    title: checker("title", title),
    description: checker("description", description),
  });

  const handleReset = () => {
    setInputs(initial);
    setErrors(validate(initial));
  };

  const handleClear = () => {
    setInputs({ title: "", description: "" });
    setErrors({ title: "", description: "" });
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const handleSubmit = async () => {
    const { title, description } = inputs;
    const err = validate({ title, description });

    if (err.title || err.description) {
      setErrors(err);
      return;
    }

    if (isDifferent) {
      await updateStudy(study.id, { title, description });
    }
  };

  return [inputs, errors, handleChange, handleSubmit, handleClear, handleReset];
}

export { useDetails };
