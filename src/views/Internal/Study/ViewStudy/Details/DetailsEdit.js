import React from "react";

import { useDetails } from "hooks";
import { Flex, Heading, Button } from "@chakra-ui/react";

import DetailsInputs from "molecules/DetailsInputs";

function DetailsEdit({ study, setEdit }) {
  const { inputs, errors, handleChange, handleSubmit, handleReset, isDifferent } = useDetails(
    study
  );

  const handleSubmitModified = () => {
    handleSubmit().then(() => setEdit(false));
  };

  const handleResetModified = () => {
    handleReset();
    setEdit(false);
  };

  return (
    <>
      <Flex justify="space-between" align="center" my="15px" h="40px">
        <Heading fontSize="28px">Edit Details</Heading>
        <Flex justify="flex-end" gridGap="10px">
          <Button colorScheme="gray" color="gray.500" onClick={handleResetModified}>
            Cancel
          </Button>
          {isDifferent && (
            <Button colorScheme="green" onClick={handleSubmitModified}>
              Save Changes
            </Button>
          )}
        </Flex>
      </Flex>
      <DetailsInputs inputs={inputs} errors={errors} handleChange={handleChange} />
    </>
  );
}

export default DetailsEdit;
