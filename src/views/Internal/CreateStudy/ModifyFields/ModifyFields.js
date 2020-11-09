import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "components";
import { compute } from "functions";

import ModifyFieldsView from "./ModifyFieldsView";

function ModifyFields({ study, setStudy, setTab }) {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });

  useEffect(() => {
    setInputs({ title: study.title || "", description: study.description || "" });
  }, [study]);

  const checker = (name, value) => {
    const check = {
      title: (value) => {
        if (value.length > 100) {
          return "The best titles are fewer than 100 characters";
        }
      },

      description: (value) => {
        if (value.length < 200 || value.length > 300) {
          return "The best descriptions are between 200 and 300 characters";
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
