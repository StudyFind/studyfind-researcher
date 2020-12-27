import React, { useState, useEffect } from "react";
import { Text, Button, Heading, Grid, Flex } from "@chakra-ui/react";
import { Form, Textarea } from "components";
import DescriptionAccessibilityScore from "views/Internal/Study/DescriptionAccessibilityScore";

function Details({ study, setStudy, setTab }) {
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

  const handleSubmit = () => {
    const err = validate(inputs);

    setErrors(err);
    const errorExists = Object.keys(err).some((i) => err[i]);
    if (errorExists) return;

    setStudy({ ...study, title: inputs.title, description: inputs.description });
    setTab("screen");
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
        recruitment
      </Text>
      <Grid py="10px" gap="10px">
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
        <DescriptionAccessibilityScore description={inputs.description} />
      </Grid>
      <Flex justify="flex-end">
        <Button mt="20px" ml="auto" colorScheme="blue" type="submit" style={{ textAlign: "right" }}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
}

export default Details;
