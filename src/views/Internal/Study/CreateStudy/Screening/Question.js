import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { FaTrash } from "react-icons/fa";

function Question({ question, index, updateQuestion, deleteQuestion }) {
  return (
    <Flex gridGap="10px" w="100%">
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
    </Flex>
  );
}

export default Question;
