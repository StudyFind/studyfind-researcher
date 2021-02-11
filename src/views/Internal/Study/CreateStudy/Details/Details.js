import React, { useState, useEffect } from "react";
import { updateStudy } from "database/studies";
import DetailsHead from "./DetailsHead";
import DetailsForm from "./DetailsForm";

function Details({ study, next, back }) {
  const original = { title: study.title, description: study.description };
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });

  useEffect(() => {
    const { id, title = "", description = "" } = study;

    if (id) {
      setInputs({ title, description });
      setErrors(() => validate(study));
    }
  }, [study]);

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

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const handleCancel = () => {
    const err = validate(original);
    setInputs(original);
    setErrors(err);
  };

  const handleSubmit = () => {
    const err = validate(inputs);

    setErrors(err);
    const errorExists = Object.keys(err).some((i) => err[i]);
    if (errorExists) return;

    const { id } = study;
    const { title, description } = inputs;
    updateStudy(id, { title, description });
    next();
  };

  return (
    <>
      <DetailsHead />
      <DetailsForm
        back={back}
        inputs={inputs}
        errors={errors}
        original={original}
        handleChange={handleChange}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Details;
