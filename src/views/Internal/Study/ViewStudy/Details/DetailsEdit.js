import React, { useState, useEffect } from "react";
import lodash from "lodash";

import { updateStudy } from "database/studies";

import { Textarea } from "components";
import { Flex, Grid, Heading, Button } from "@chakra-ui/react";

import DescriptionAccessibilityScore from "molecules/DescriptionAccessibilityScore";

function DetailsEdit({ study, setEdit }) {
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
    const errorMessage = `Please ensure that the study ${name} is between ${min} and ${max} characters`;
    return isInvalid ? errorMessage : "";
  };

  const check = (name, value) => {
    const [min, max] = {
      title: [50, 100],
      description: [300, 500],
    }[name];
    return characterCheck(name, value, min, max);
  };

  const validate = ({ title, description }) => ({
    title: check("title", title),
    description: check("description", description),
  });

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: check(name, value) });
  };

  const handleCancel = () => {
    resetInputs();
    setEdit(false);
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

    setEdit(false);
  };

  return (
    <>
      <Flex justify="space-between" align="center" my="15px" h="40px">
        <Heading fontSize="28px">Edit Details</Heading>
        <Flex justify="flex-end" gridGap="10px">
          <Button colorScheme="gray" color="gray.500" onClick={handleCancel}>
            Cancel
          </Button>
          {isDifferent && (
            <Button colorScheme="green" onClick={handleSubmit}>
              Save Changes
            </Button>
          )}
        </Flex>
      </Flex>
      <Grid gap="10px" pt="10px">
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
    </>
  );
}

export default DetailsEdit;
