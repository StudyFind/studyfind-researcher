import { useScreening } from "hooks";

import { EditorButton } from "@studyfind/components";
import { Button, Flex, Grid } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

import QuestionList from "molecules/QuestionList";

function ScreeningGrid({ study, handleBack, handleNext }) {
  const {
    inputs,
    errors,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    clearQuestions,
    sortQuestions,
  } = useScreening(study);

  const handleSubmit = () => {
    handleNext({ questions: inputs });
  };

  return (
    <>
      <Flex gridGap="10px">
        {inputs.length ? (
          <EditorButton icon={<FaTrash />} color="red" onClick={clearQuestions}>
            Delete All
          </EditorButton>
        ) : null}
      </Flex>
      <Grid w="100%" gap="10px" py="10px">
        <QuestionList
          inputs={inputs}
          errors={errors}
          onSortEnd={sortQuestions}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          useDragHandle
        />
        <Button leftIcon={<FaPlus />} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Grid>
      <Flex justify="flex-end" gridGap="10px">
        <Button color="gray.500" variant="outline" onClick={handleBack}>
          Back
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit} type="submit">
          Next
        </Button>
      </Flex>
    </>
  );
}

export default ScreeningGrid;
