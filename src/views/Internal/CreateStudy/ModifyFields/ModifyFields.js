import React, { useState, useEffect } from "react";
import { compute } from "functions";

import ModifyFieldsView from "./ModifyFieldsView";

function ModifyFields({ study, setStudy, setTab }) {
  const [inputs, setInputs] = useState({ title: "", description: "" });
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

  const handleSubmit = () => {
    const err = {
      title: checker("title", inputs.title),
      description: checker("description", inputs.description),
    };

    setErrors(err);
    const errorExists = Object.keys(err).some((i) => err[i]);
    if (errorExists) return;

    setStudy({ ...study, title: inputs.title, description: inputs.description });
    setTab("survey");
  };

  return (
    <ModifyFieldsView
      inputs={inputs}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default ModifyFields;
