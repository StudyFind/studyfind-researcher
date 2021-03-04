import React from "react";
import { Button, Flex, Grid } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";
import Question from "./Question";

function ScreeningGrid({
  back,
  questions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestions,
  handleSubmit,
}) {
  return (
    <>
      {questions.length ? (
        <Button
          leftIcon={<FaTrash />}
          colorScheme=""
          color="red.500"
          _hover={{ bg: "red.100" }}
          onClick={deleteAllQuestions}
        >
          Delete All
        </Button>
      ) : null}
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
        <Button
          colorScheme="gray"
          color="gray.500"
          variant="outline"
          style={{ textAlign: "right" }}
          onClick={back}
        >
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
