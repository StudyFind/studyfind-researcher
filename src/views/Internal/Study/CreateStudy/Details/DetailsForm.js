import { useDetails } from "hooks";
import { object } from "functions";

import { EditorButton } from "@studyfind/components";
import { Flex, Button } from "@chakra-ui/react";
import { FaEraser, FaUndo } from "react-icons/fa";

import DetailsInputs from "molecules/DetailsInputs";

function DetailsForm({ study, next, back }) {
  const {
    inputs,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleClear,
    handleReset,
    isDifferent,
  } = useDetails(study);

  const isInputNotEmpty = object.some(inputs);

  const handleSubmitModified = () => {
    handleSubmit().then(next);
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
        <Button type="submit" colorScheme="blue" onClick={handleSubmitModified} isLoading={loading}>
          Next
        </Button>
      </Flex>
    </>
  );
}

export default DetailsForm;
