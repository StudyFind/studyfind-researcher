import React, { useState } from "react";
import { Form, Input, Button } from "components";
import { compute } from "functions";

function ModifyFields({ study, setStudy, setTab }) {
  const [inputs, setInputs] = useState({ title: study.title, description: study.description });
  const [errors, setErrors] = useState({});

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

  const handleInputs = (name, value) => {
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
    <Form onSubmit={handleSubmit}>
      <div>
        We at StudyFind strive to make research studies as accessible as possible. To achieve this,
        we ask that researchers simplify the language used in the study description by avoiding
        medical jargon and making it readable for the general population to improve their partipant
        recruitment
      </div>
      <Input
        label
        name="title"
        type="textarea"
        value={inputs.title}
        error={errors.title}
        onChange={handleInputs}
      />
      <Input
        label
        name="description"
        type="textarea"
        value={inputs.description}
        error={errors.description}
        onChange={handleInputs}
      />
      <Button>Submit</Button>
    </Form>
  );
}

export default ModifyFields;
