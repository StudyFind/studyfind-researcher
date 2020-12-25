import React from "react";
import styled from "styled-components";
import { IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { FaTrash } from "react-icons/fa";

function Question({ question, index, updateQuestion, deleteQuestion }) {
  return (
    <Row>
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

export default Question;
