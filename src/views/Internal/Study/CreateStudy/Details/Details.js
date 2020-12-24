import React, { useState, useEffect } from "react";

import DetailsView from "./DetailsView";

function Details({ study, setStudy, setTab }) {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });

  useEffect(() => {
    if (study.id) {
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
        const MIN_LIMIT = 300;
        const MAX_LIMIT = 500;

        if (value.length < MIN_LIMIT || value.length > MAX_LIMIT) {
          return `The best descriptions are between ${MIN_LIMIT} and ${MAX_LIMIT} characters`;
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
    setTab("screen");
  };

  return (
    <DetailsView
      inputs={inputs}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default Details;
