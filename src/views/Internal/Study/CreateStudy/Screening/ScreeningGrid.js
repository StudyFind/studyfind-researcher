import React from "react";
import lodash from "lodash";

import { useScreening } from "hooks";

import { EditorButton } from "components";
import { Button, Flex, Grid } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaUndo } from "react-icons/fa";

import QuestionList from "molecules/QuestionList";

function ScreeningGrid({ study, back, next }) {
  const {
    values,
    errors,
    loading,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    clearQuestions,
    resetQuestions,
    sortQuestions,
    handleSubmit,
  } = useScreening(study);

  const handleSubmitModified = () => {
    handleSubmit().then(next);
  };

  return (
    <>
      <Flex gridGap="10px">
        {!lodash.isEqual(study.questions, values) && (
          <EditorButton icon={<FaUndo />} color="gray" onClick={resetQuestions}>
            Undo Changes
          </EditorButton>
        )}
        {values.length && (
          <EditorButton icon={<FaTrash />} color="red" onClick={clearQuestions}>
            Delete All
          </EditorButton>
        )}
      </Flex>
      <Grid w="100%" gap="10px" py="10px">
        <QuestionList
          values={values}
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
        <Button color="gray.500" variant="outline" onClick={back}>
          Back
        </Button>
        <Button colorScheme="blue" onClick={handleSubmitModified} type="submit" isLoading={loading}>
          Next
        </Button>
      </Flex>
    </>
  );
}

export default ScreeningGrid;
