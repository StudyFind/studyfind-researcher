import React from "react";
import lodash from "lodash";
import { Button, Flex, Grid } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaUndo } from "react-icons/fa";
import Question from "./Question";

function ScreeningGrid({
  back,
  original,
  questions,
  setQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestions,
  handleSubmit,
}) {
  return (
    <>
      <Flex gridGap="10px">
        {!lodash.isEqual(original, questions) && (
          <Button
            size="sm"
            leftIcon={<FaUndo />}
            color="gray.500"
            bg="gray.100"
            borderWidth="1px"
            borderColor="gray.500"
            _hover={{ bg: "gray.200" }}
            onClick={() => setQuestions(original)}
          >
            Undo Changes
          </Button>
        )}
        {!!questions.length && (
          <Button
            size="sm"
            leftIcon={<FaTrash />}
            color="red.500"
            bg="red.100"
            borderWidth="1px"
            borderColor="red.500"
            _hover={{ bg: "red.200" }}
            onClick={deleteAllQuestions}
          >
            Delete All
          </Button>
        )}
      </Flex>
      <Grid w="100%" gap="10px" py="10px">
        {questions.map((question, index) => (
          <Question
            key={index}
            index={index}
            question={question}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))}
        <Button leftIcon={<FaPlus />} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Grid>
      <Flex justify="flex-end" gridGap="10px">
        <Button color="gray.500" variant="outline" onClick={back}>
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
