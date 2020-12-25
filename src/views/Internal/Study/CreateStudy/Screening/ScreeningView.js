import React from "react";
import styled from "styled-components";
import { Heading, Text, Button } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

import Question from "./Question";

function ScreeningView({
  questions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestions,
  handleSubmit,
}) {
  return (
    <Grid>
      <Heading size="lg" mb="10px">
        Modifying Eligibility Criteria
      </Heading>
      <Text mb="10px" color="gray.500">
        These exclusion and inclusion criteria will be used to automatically generate a screening
        survey for interested participants to answer in their process of enrolling.
      </Text>
      {questions && questions.length ? (
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
      <Questions>
        {questions &&
          questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
            />
          ))}
        <Button leftIcon={<FaPlus />} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Questions>
      <Buttons>
        <Button colorScheme="blue" onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Buttons>
    </Grid>
  );
}

const Row = styled.div`
  display: flex;
  grid-gap: 10px;
  width: 100%;
`;

const Grid = styled.div``;

const Questions = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 10px;
  padding: 10px 0;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
  justify-content: flex-end;
`;

export default ScreeningView;
