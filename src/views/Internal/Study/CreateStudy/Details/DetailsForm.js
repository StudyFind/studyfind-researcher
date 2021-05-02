import React from "react";

import { useDetails } from "hooks";

import { EditorButton } from "components";
import { Flex, Button } from "@chakra-ui/react";
import { FaEraser, FaUndo } from "react-icons/fa";

import DetailsInputs from "molecules/DetailsInputs";

function DetailsForm({ study, next, back }) {
  const {
    inputs,
    errors,
    handleChange,
    handleSubmit,
    handleClear,
    handleReset,
    isDifferent,
  } = useDetails(study);

  const isInputNotEmpty = !Object.values(inputs).every((v) => !v);

  const handleSubmitModified = () => {
    handleSubmit();
    next();
  };

  return (
    <>
      <Flex gridGap="10px">
        {isDifferent && (
          <EditorButton icon={<FaUndo />} color="gray" onClick={handleReset}>
            Undo Changes
          </EditorButton>
        )}
        {isInputNotEmpty && (
          <EditorButton icon={<FaEraser />} color="purple" onClick={handleClear}>
            Clear Text
          </EditorButton>
        )}
      </Flex>
      <DetailsInputs inputs={inputs} errors={errors} handleChange={handleChange} />
      <Flex justify="flex-end" mt="20px" gridGap="10px">
        <Button color="gray.500" variant="outline" onClick={back}>
          Back
        </Button>
        <Button type="submit" colorScheme="blue" onClick={handleSubmitModified}>
          Next
        </Button>
      </Flex>
    </>
  );
}

export default DetailsForm;
