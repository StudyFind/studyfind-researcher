import React from "react";
import styled from "styled-components";
import { Heading, Text, Input, Select, Button, IconButton } from "@chakra-ui/core";
import { FaTrash, FaPlus } from "react-icons/fa";

function ModifySurveyView({
  questions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestions,
  handleSubmit,
}) {
  const questionComponents = questions.map((question, index) => (
    <Row key={index}>
      <Select
        w="210px"
        value={question.type}
        onChange={(e) => updateQuestion(index, "type", e.target.value)}
      >
        <option value="Inclusion">Inclusion</option>
        <option value="Exclusion">Exclusion</option>
      </Select>
      <Input
        value={question.prompt}
        onChange={(e) => updateQuestion(index, "prompt", e.target.value)}
      />
      <IconButton variantColor="red" icon={FaTrash} onClick={() => deleteQuestion(index)} />
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
      <Questions>{questionComponents}</Questions>
      <Buttons>
        <Button leftIcon={FaTrash} variantColor="red" onClick={deleteAllQuestions}>
          Delete All
        </Button>
        <Button leftIcon={FaPlus} variantColor="green" onClick={createQuestion}>
          Add Question
        </Button>
        <Button variantColor="blue" onClick={handleSubmit} type="submit">
          Next
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
`;

export default ModifySurveyView;
