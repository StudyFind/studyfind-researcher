import { useState, useEffect } from "react";
import { object } from "utils";

import { Flex, Heading, Text, Button } from "@chakra-ui/react";

import DetailsInputs from "molecules/DetailsInputs";

function Details({ study, handleBack, handleNext }) {
  const [inputs, setInputs] = useState({ title: "", details: "" });
  const [errors, setErrors] = useState({ title: "", details: "" });

  const check = (name, value) => {
    if (!value) return true;

    const [min, max] = {
      title: [50, 100],
      description: [300, 500],
    }[name];

    if (value.length < min || value.length > max) {
      return `Please ensure that the study ${name} is between ${min} and ${max} characters`;
    }
  };

  const validate = ({ title, description }) => ({
    title: check("title", title),
    description: check("description", description),
  });

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };

  useEffect(() => {
    if (study.id) {
      handleChange("title", study.title);
      handleChange("description", study.description);
    }
  }, [study]);

  const handleSubmit = () => {
    const error = validate(inputs);

    if (object.some(error)) {
      setErrors(error);
      return;
    }

    handleNext(inputs);
  };

  return (
    <>
      <Heading size="lg" mb="10px">
        Title and Description
      </Heading>
      <Text mb="10px" color="gray.500">
        StudyFind strives to make research studies as accessible as possible. To achieve this, we
        ask that you simplify the language used in the study title and description. This will make
        the study more readable for the general population and will lead to improvements in
        partipant recruitment.
      </Text>
      <DetailsInputs inputs={inputs} errors={errors} handleChange={handleChange} />
      <Flex justify="flex-end" mt="20px" gridGap="10px">
        <Button color="gray.500" variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
          Next
        </Button>
      </Flex>
    </>
  );
}

export default Details;
