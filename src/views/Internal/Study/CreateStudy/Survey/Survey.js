import React from "react";
import styled from "styled-components";
import Question from "./Question";
import { useArray } from "hooks";
import { Heading, Text, Button } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

function Survey({ study, setStudy, setTab }) {
  const { array, appendElement, updateElement, deleteElementByIndex, clearArray } = useArray(
    study.questions
  );

  const handleSubmit = () => {
    setStudy({ ...study, questions: array });
    setTab("consent");
  };

  const updateQuestion = (index, name, value) => {
    const updated = {
      ...array[index],
      [name]: value,
    };
    updateElement(updated, index);
  };

  const createQuestion = () => {
    appendElement({ prompt: "", type: "Inclusion" });
  };

  const questionComponents =
    array &&
    array.map((question, index) => (
      <Question
        key={index}
        index={index}
        question={question}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteElementByIndex}
      />
    ));

  return (
    <div>
      <Heading size="lg" mb="10px">
        Modifying Eligibility Criteria
      </Heading>
      <Text mb="10px" color="gray.500">
        These exclusion and inclusion criteria have been taken from your study on clinicaltrials.gov
        and will be used to automatically generate a survey for interested participants to answer in
        their process of enrolling.
      </Text>
      {array && array.length ? (
        <Button
          leftIcon={<FaTrash />}
          colorScheme=""
          color="red.500"
          _hover={{ bg: "red.100" }}
          onClick={clearArray}
        >
          Delete All
        </Button>
      ) : null}
      <Questions>
        {questionComponents}
        <Button leftIcon={<FaPlus />} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Questions>
      <Buttons>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
      </Buttons>
    </div>
  );
}

const Questions = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 10px;
  margin: 10px 0;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
  justify-content: flex-end;
`;

export default Survey;
