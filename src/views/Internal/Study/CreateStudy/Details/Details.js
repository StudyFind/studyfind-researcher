import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Heading, Text, Form, Textarea, Button } from "components";
import DescriptionAccessibilityScore from "views/Internal/Study/DescriptionAccessibilityScore";

function Details({ study, setStudy, setTab }) {
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

  const handleSubmit = () => {
    const err = validate(inputs);
    setErrors(err);

    const errorExists = Object.keys(err).some((i) => err[i]);
    if (errorExists) return;

    setStudy({ ...study, title: inputs.title, description: inputs.description });
    setTab("survey");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Heading size="lg" mb="10px">
        Modifying Title and Description
      </Heading>
      <Text mb="10px" color="gray.500">
        StudyFind strives to make research studies as accessible as possible. To achieve this, we
        ask that researchers simplify the language used in the study description by avoiding medical
        jargon and making it readable for the general population to improve their partipant
        recruitment.
      </Text>
      <Inputs>
        <Textarea
          label="Study Title"
          name="title"
          value={inputs.title}
          error={errors.title}
          limit={100}
          height="60px"
          onChange={handleChange}
        />
        <Textarea
          label="Study Description"
          name="description"
          value={inputs.description}
          error={errors.description}
          limit={500}
          height="150px"
          onChange={handleChange}
        />
        <DescriptionAccessibilityScore description={inputs.description || ""} />
      </Inputs>
      <Buttons>
        <Button mt="20px" colorScheme="blue" type="submit">
          Submit
        </Button>
      </Buttons>
    </Form>
  );
}

const Inputs = styled.div`
  display: grid;
  padding: 10px 0;
  grid-gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
  justify-content: flex-end;
`;

export default Details;
