import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "components";

function ModifySurvey({ study, setStudy, setTab }) {
  const [questions, setQuestions] = useState(study.questions || []);

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
      <Input
        type="select"
        value={question.type}
        options={["Inclusion", "Exclusion"]}
        onChange={(e) => editQuestion(index, "type", e.target.value)}
      />
      <Input
        value={question.prompt}
        onChange={(e) => editQuestion(index, "prompt", e.target.value)}
      />
      <Button color="secondary" onClick={() => removeQuestion(index)}>
        Remove
      </Button>
    </Row>
  ));

  return (
    <Grid>
      {questionComponents}
      <Buttons>
        <Button color="danger" onClick={removeAllQuestions}>
          Remove All
        </Button>
        <Button color="success" onClick={addQuestion}>
          Add
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Buttons>
    </Grid>
  );
}

const Row = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 100px;
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

export default ModifySurvey;
