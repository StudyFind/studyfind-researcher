import React from "react";
import styled from "styled-components";
import { Heading, Text, Button, IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { FaTrash, FaPlus } from "react-icons/fa";

function SurveyView({
  questions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestions,
  handleSubmit,
}) {
  const questionComponents =
    questions &&
    questions.map((question, index) => (
      <Row key={index}>
        <Select
          w="210px"
          value={question.type}
          onChange={(_, value) => updateQuestion(index, "type", value)}
          options={["Inclusion", "Exclusion"]}
        />
        <Input
          placeholder="Question Prompt"
          value={question.prompt}
          onChange={(_, value) => updateQuestion(index, "prompt", value)}
        />
        <IconButton
          colorScheme=""
          color="gray.500"
          _hover={{ color: "red.500", bg: "red.100" }}
          icon={<FaTrash />}
          onClick={() => deleteQuestion(index)}
        />
      </Row>
    ));

  return (
    <Grid>
      <Heading size="lg" mb="10px">
        Modifying Eligibility Criteria
      </Heading>
      <Text mb="10px" color="gray.500">
        These exclusion and inclusion criteria will be used to automatically generate a survey for
        interested participants to answer in their process of enrolling.
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
        {questionComponents}
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

export default SurveyView;
