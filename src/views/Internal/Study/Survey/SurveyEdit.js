import React from "react";
import styled from "styled-components";
import { Heading, Input, Select, Button, IconButton } from "@chakra-ui/core";
import { FaTrash, FaPlus, FaSave, FaTimes } from "react-icons/fa";

function SurveyEdit({
  original,
  questions,
  handleCancel,
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
      <IconButton
        variantColor=""
        color="gray.500"
        _hover={{ color: "red.500", bg: "red.100" }}
        icon={FaTrash}
        onClick={() => deleteQuestion(index)}
      />
    </Row>
  ));

  return (
    <>
      <Head>
        <Heading fontSize="28px">Edit Survey Questions</Heading>
        <Buttons>
          <Button
            variantColor=""
            color="gray.500"
            bg="gray.200"
            _hover={{ bg: "gray.300" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {questions && questions.length ? (
            <Button variantColor="red" onClick={deleteAllQuestions}>
              Delete All
            </Button>
          ) : null}
          {JSON.stringify(questions) !== JSON.stringify(original) ? (
            <Button variantColor="green" onClick={handleSubmit}>
              Save Changes
            </Button>
          ) : null}
        </Buttons>
      </Head>
      <Questions>
        {questionComponents}
        <Button leftIcon={FaPlus} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Questions>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Row = styled.div`
  display: flex;
  grid-gap: 10px;
  width: 100%;
`;

const Questions = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
`;

export default SurveyEdit;
