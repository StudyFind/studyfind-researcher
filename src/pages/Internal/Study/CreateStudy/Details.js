import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

import DetailsInputs from "components/feature/Study/DetailsInputs/DetailsInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";
import { object } from "utils";

function Details({ study, setStudy, handleNext }) {
  const [values, setValues] = useState({ title: study.title, description: study.description });
  const [errors, setErrors] = useState({ title: "", description: "" });

  const check = (name, value) => {
    const titleCaseName = name.charAt(0).toUpperCase() + name.slice(1);

    if (!value) return `${titleCaseName} cannot be empty`;

    const [min, max] = {
      title: [50, 100],
      description: [300, 500],
    }[name];

    if (value.length < min || value.length > max) {
      return `${titleCaseName} must be between ${min} and ${max} characters`;
    }

    return "";
  };

  const validate = ({ title, description }) => ({
    title: check("title", title),
    description: check("description", description),
  });

  const handleReset = () => {
    const valueOriginal = { title: study.title, description: study.description };
    const errorMessages = validate(valueOriginal);

    setValues(valueOriginal);
    setErrors(errorMessages);
  };

  const handleClear = () => {
    setValues({ title: "", description: "" });
    setErrors({ title: "", description: "" });
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };

  const handleSubmit = () => {
    const errorMessages = validate(values);

    if (object.some(errorMessages)) {
      setErrors(errorMessages);
      return;
    }

    setStudy((prev) => ({ ...prev, ...values }));
    handleNext();
  };

  return (
    <Box paddingY="20px">
      <Heading>Details</Heading>
      <Text color="gray.500" paddingTop="5px" paddingBottom="10px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </Text>
      <DetailsInputs
        values={values}
        errors={errors}
        handleReset={handleReset}
        handleClear={handleClear}
        handleChange={handleChange}
      />
      <WizardFormButton isFirstStep handleNext={handleSubmit} />
    </Box>
  );
}

export default Details;
