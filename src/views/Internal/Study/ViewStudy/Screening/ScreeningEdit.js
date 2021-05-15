import React from "react";
import lodash from "lodash";

import { useScreening } from "hooks";

import { FaPlus } from "react-icons/fa";
import { Flex, Grid, Heading, Button } from "@chakra-ui/react";

import QuestionList from "molecules/QuestionList";

function ScreeningEdit({ study, setEdit }) {
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
    handleSubmit().then(() => setEdit(false));
  };

  const handleCancel = () => {
    resetQuestions();
    setEdit(false);
  };

  const isDifferent = !lodash.isEqual(values, study.questions);

  return (
    <>
      <Flex justify="space-between" align="center" my="15px">
        <Heading fontSize="28px">Edit Screening</Heading>
        <Flex gridGap="10px">
          <Button variant="outline" color="gray.500" onClick={handleCancel}>
            Cancel
          </Button>
          {values?.length && (
            <Button colorScheme="red" onClick={clearQuestions}>
              Delete All
            </Button>
          )}
          {isDifferent && (
            <Button colorScheme="green" onClick={handleSubmitModified} isLoading={loading}>
              Save Changes
            </Button>
          )}
        </Flex>
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
    </>
  );
}

export default ScreeningEdit;
