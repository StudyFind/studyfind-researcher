import React, { useState, useEffect } from "react";
import { updateStudy } from "database/studies";

import DetailsView from "./DetailsView";
import DetailsEdit from "./DetailsEdit";

function Details({ study, setStudy }) {
  const [edit, setEdit] = useState(false);
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
    return isInvalid ? `The best ${name}s are between ${min} and ${max} characters` : "";
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
    setInputs({ title: study.title, description: study.description });
    setEdit(false);
  };

  const handleSubmit = () => {
    const err = validate(inputs);

    setErrors(err);
    const errorExists = Object.keys(err).some((i) => err[i]);
    if (errorExists) return;

    const updated = { ...study, title: inputs.title, description: inputs.description };
    updateStudy(updated);
    setEdit(false);
  };

  return edit ? (
    <DetailsEdit
      original={{ title: study.title, description: study.description }}
      inputs={inputs}
      errors={errors}
      handleChange={handleChange}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    />
  ) : (
    <DetailsView study={study} setEdit={setEdit} />
  );
}

export default Details;
