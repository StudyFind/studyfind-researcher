import { useDetailsInputs } from "hooks";

import { Box, Heading, Text } from "@chakra-ui/react";

import DetailsInputs from "components/feature/Study/DetailsInputs/DetailsInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";

function Details({ newStudy, setNewStudy, handleNext }) {
  const {
    values,
    errors,
    hasChanged,
    notDefault,
    handleReset,
    handleClear,
    handleChange,
    handleSubmit,
  } = useDetailsInputs(newStudy, (data) => {
    setNewStudy((prev) => ({ ...prev, ...data }));
    handleNext();
  });

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
        hasChanged={hasChanged}
        notDefault={notDefault}
        handleReset={handleReset}
        handleClear={handleClear}
        handleChange={handleChange}
      />
      <WizardFormButton isFirstStep handleNext={handleSubmit} />
    </Box>
  );
}

export default Details;
