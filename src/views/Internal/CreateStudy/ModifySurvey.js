import React, { useState } from "react";
import styled from "styled-components";
import { Input, Select, Button, IconButton } from "@chakra-ui/core";
import { FaTimes } from "react-icons/fa";

function ModifySurvey({ study, setStudy, setTab }) {
  const [questions, setQuestions] = useState(
    study.questions || [{ prompt: "Hello", type: "Exclusion" }]
  );

  const addQuestion = () => {
    const updated = [...questions];
    updated[updated.length] = { type: "", prompt: "" };
    setQuestions(updated);
  };

  const editQuestion = (index, name, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [name]: value };
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const removeAllQuestions = () => {
    setQuestions([]);
  };

  const handleSubmit = () => {
    // handle submit button
  };

  const questionComponents = questions.map((question, index) => (
    <Row key={index}>
      <Type
        w="180px"
        value={question.type}
        onChange={(e) => editQuestion(index, "type", e.target.value)}
      >
        <option value="Inclusion">Inclusion</option>
        <option value="Exclusion">Exclusion</option>
      </Type>
      <Input
        value={question.prompt}
        onChange={(e) => editQuestion(index, "prompt", e.target.value)}
      />
      <IconButton icon={FaTimes} variantColor="gray" onClick={() => removeQuestion(index)} />
    </Row>
  ));

  return (
    <Grid>
      {questionComponents}
      <Buttons>
        <Button variantColor="red" onClick={removeAllQuestions}>
          Remove All
        </Button>
        <Button variantColor="green" onClick={addQuestion}>
          Add
        </Button>
        <Button variantColor="blue" onClick={handleSubmit}>
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

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;

  & > * {
    flex: 1;
  }
`;

const Type = styled(Select)`
  width: 150px;
`;

export default ModifySurvey;
