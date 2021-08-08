import { object } from "functions";

import { EditorButton } from "@studyfind/components";
import { Flex, Button } from "@chakra-ui/react";
import { FaEraser } from "react-icons/fa";

import DetailsInputs from "molecules/DetailsInputs";
import { useEffect, useState } from "react";

function DetailsForm({ study, setStudy, handleBack, handleNext }) {
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

  const handleClear = () => {
    handleChange("title", "");
    handleChange("description", "");
  };

  useEffect(() => {
    if (study) {
      handleChange("title", study.title);
      handleChange("description", study.description);
    }
  }, [study]);

  const handleSubmit = () => {
    const error = validate(inputs);

    if (error.title || error.description) {
      setErrors(error);
      return;
    }

    setStudy((prev) => ({
      ...prev,
      title: inputs.title,
      description: inputs.description,
    }));

    handleNext();
  };

  const isInputNotEmpty = object.some(inputs);

  return (
    <>
      <Flex gridGap="10px">
        {isInputNotEmpty && (
          <EditorButton icon={<FaEraser />} color="purple" onClick={handleClear}>
            Clear Text
          </EditorButton>
        )}
      </Flex>
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

export default DetailsForm;
