import React, { useState, useEffect } from "react";
import { updateStudy } from "database/studies";
import { compute } from "functions";

import DetailsCard from "./DetailsCard";
import DetailsEdit from "./DetailsEdit";

function Details({ study, setStudy }) {
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({ title: study.title, description: study.description });
  const [errors, setErrors] = useState({ title: "", description: "" });

  useEffect(() => {
    if (study.nctID) {
      setInputs({ title: study.title || "", description: study.description || "" });

      const err = {
        title: checker("title", study.title),
        description: checker("description", study.description),
      };

      setErrors(err);
    }
  }, [study]);

  const checker = (name, value) => {
    const check = {
      title: (value) => {
        const MIN_LIMIT = 50;
        const MAX_LIMIT = 100;

        if (value.length < MIN_LIMIT || value.length > MAX_LIMIT) {
          return `The best titles are between ${MIN_LIMIT} and ${MAX_LIMIT} characters`;
        }
      },

      description: (value) => {
        const MIN_LIMIT = 400;
        const MAX_LIMIT = 500;

        if (value.length < MIN_LIMIT || value.length > MAX_LIMIT) {
          return `The best descriptions are between ${MIN_LIMIT} and ${MAX_LIMIT} characters`;
        }

        if (compute.readabilityIndex(value) > 16) {
          return "Description is too complicated for the general population";
        }
      },
    };

    return check[name](value);
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const handleCancel = () => {
    setInputs({ title: study.title, description: study.description });
    setEdit(false);
  };

  const handleSubmit = () => {
    const err = {
      title: checker("title", inputs.title),
      description: checker("description", inputs.description),
    };

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
    <DetailsCard study={study} setEdit={setEdit} />
  );
}

export default Details;
