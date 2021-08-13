import { useEffect, useState } from "react";
import { object } from "utils";

import { Flex, Button } from "@chakra-ui/react";

function EligibilityForm({ study, handleBack, handleNext }) {
  const [inputs, setInputs] = useState({
    minAge: "",
    maxAge: "",
    sex: "",
    control: false,
    conditions: [],
  });
  const [errors, setErrors] = useState({
    minAge: "",
    maxAge: "",
    sex: "",
    control: false,
    conditions: [],
  });

  const check = (name, value) => {
    if (!value) return true;

    if (name === "maxAge") {
      if (inputs.min > value) {
        return "Max age must be greater than min age";
      }
    }

    if (name === "conditions") {
      if (value?.length < 3) {
        return "You must have at least three conditions";
      }
    }
  };

  const validate = ({ title, description }) => ({
    title: check.title(title),
    description: check.description(description),
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

export default EligibilityForm;
