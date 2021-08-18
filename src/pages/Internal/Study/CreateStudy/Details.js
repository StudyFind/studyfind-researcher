import { useDetails } from "hooks";
import { Box, Heading, Text } from "@chakra-ui/react";

import DetailsInputs from "components/feature/Study/DetailsInputs/DetailsInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";

function Details({ setStudy, handleNext }) {
  const { values, errors, handleChange, handleClear, handleReset, handleSubmit } = useDetails(
    null,
    () => {
      handleNext();
    }
  );

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
