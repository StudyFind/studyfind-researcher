import React, { useState, useEffect } from "react";
import { updateStudy } from "database/studies";
import { Form, Textarea } from "components";
import { Button, Grid, Flex } from "@chakra-ui/react";
import { FaUndo } from "react-icons/fa";
import lodash from "lodash";

function DetailsForm({ study, next, back }) {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });

  const { title, description } = study;
  const original = { title, description };
  const isDifferent = !lodash.isEqual(original, inputs);

  const resetInputs = () => {
    if (study.id) {
      setInputs(original);
      setErrors(validate(original));
    }
  };

  useEffect(() => {
    resetInputs();
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
    resetInputs();
  };

  const handleSubmit = () => {
    const { title, description } = inputs;
    const err = validate({ title, description });

    if (err.title || err.description) {
      setErrors(err);
      return;
    }

    updateStudy(study.id, { title, description });
    next();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {isDifferent && (
        <Button leftIcon={<FaUndo />} colorScheme="gray" color="gray.500" onClick={handleCancel}>
          Undo Changes
        </Button>
      )}
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
      </Grid>
      <Flex justify="flex-end" mt="20px" gridGap="10px">
        <Button colorScheme="gray" color="gray.500" variant="outline" onClick={back}>
          Back
        </Button>
        <Button colorScheme="blue" type="submit">
          Next
        </Button>
      </Flex>
    </Form>
  );
}

export default DetailsForm;
