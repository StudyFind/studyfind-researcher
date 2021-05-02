import React, { useState, useEffect } from "react";
import lodash from "lodash";

import { updateStudy } from "database/studies";

import { Form, Textarea } from "components";
import { Flex, Grid, Button } from "@chakra-ui/react";
import { FaEraser, FaUndo } from "react-icons/fa";

function DetailsForm({ study, next, back }) {
  const [inputs, setInputs] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });

  const { title, description } = study;
  const original = { title, description };
  const isDifferent = !lodash.isEqual(original, inputs);
  const isInputNotEmpty = !Object.values(inputs).every((v) => !v);

  const clearInputs = () => {
    if (study.id) {
      setInputs({ title: "", description: "" });
      setErrors({ title: "", description: "" });
    }
  };

  const resetInputs = () => {
    if (study.id) {
      setInputs(original);
      setErrors(validate(original));
    }
  };

  useEffect(() => {
    resetInputs();
  }, [study]);

  const check = (name, value) => {
    if (!value) {
      return true;
    }

    const [min, max] = {
      title: [50, 100],
      description: [300, 500],
    }[name];

    const length = value.length;
    const meetsMinLength = length >= min;
    const meetsMaxLength = length <= max;

    if (meetsMinLength && meetsMaxLength) {
      return false;
    }

    return `Please ensure that the study ${name} is between ${min} and ${max} characters`;
  };

  const validate = ({ title, description }) => ({
    title: check("title", title),
    description: check("description", description),
  });

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: check(name, value) });
  };

  const handleSubmit = () => {
    const error = validate(inputs);
    const valid = Object.values(error).every((v) => !v);

    if (!valid) {
      setErrors(error);
      return;
    }

    if (isDifferent) {
      updateStudy(study.id, inputs);
    }

    next();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Flex gridGap="10px">
        {isDifferent && (
          <Button
            size="sm"
            leftIcon={<FaUndo />}
            color="gray.500"
            bg="gray.100"
            borderWidth="1px"
            borderColor="gray.500"
            _hover={{ bg: "gray.200" }}
            onClick={resetInputs}
          >
            Undo Changes
          </Button>
        )}
        {isInputNotEmpty && (
          <Button
            size="sm"
            leftIcon={<FaEraser />}
            color="purple.500"
            bg="purple.100"
            borderWidth="1px"
            borderColor="purple.500"
            _hover={{ bg: "purple.200" }}
            onClick={clearInputs}
          >
            Clear Text
          </Button>
        )}
      </Flex>
      <Grid py="10px" gap="10px">
        <Textarea
          label="Study Title"
          name="title"
          value={inputs.title}
          error={errors.title}
          limit={100}
          height="50px"
          onChange={handleChange}
        />
        <Textarea
          label="Study Description"
          name="description"
          value={inputs.description}
          error={errors.description}
          limit={500}
          height="128px"
          onChange={handleChange}
        />
      </Grid>
      <Flex justify="flex-end" mt="20px" gridGap="10px">
        <Button color="gray.500" variant="outline" onClick={back}>
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
