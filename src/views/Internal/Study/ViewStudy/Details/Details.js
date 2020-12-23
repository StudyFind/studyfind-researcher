import React, { useState, useEffect } from "react";
import { updateStudy } from "database/studies";

import DetailsView from "./DetailsView";
import DetailsEdit from "./DetailsEdit";

function Details({ study, setStudy }) {
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });

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
    if (study.id) {
      const inp = { title: study.title || "", description: study.description || "" };
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
    setStudy(updated);
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
