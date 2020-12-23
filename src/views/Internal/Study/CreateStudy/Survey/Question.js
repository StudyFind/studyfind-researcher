import React from "react";
import styled from "styled-components";
import { Input, Select, IconButton } from "components";
import { FaTrash } from "react-icons/fa";

function Question({ index, question, updateQuestion, deleteQuestion }) {
  return (
    <Row>
      <Select
        w="210px"
        value={question.type}
        onChange={(_, value) => updateQuestion(index, "type", value)}
        options={["Inclusion", "Exclusion"]}
      />
      <Input
        placeholder="Prompt"
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

export default Question;
