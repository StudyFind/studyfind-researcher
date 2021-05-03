import React from "react";

import { FaTrash } from "react-icons/fa";
import { Select, Input } from "components";
import { Flex, IconButton } from "@chakra-ui/react";
import { SortableElement } from "react-sortable-hoc";

import DragHandle from "./DragHandle";

export default SortableElement(({ i, value, error, updateQuestion, deleteQuestion }) => (
  <Flex gridGap="10px" w="100%">
    <DragHandle />
    <Select
      w="210px"
      name="type"
      value={value.type}
      error={error.type}
      onChange={(name, value) => updateQuestion(i, name, value)}
      options={["Inclusion", "Exclusion"]}
    />
    <Input
      placeholder="Question Prompt"
      name="prompt"
      value={value.prompt}
      error={error.prompt}
      onChange={(name, value) => updateQuestion(i, name, value)}
    />
    <IconButton
      colorScheme=""
      color="gray.500"
      _hover={{ color: "red.500", bg: "red.100" }}
      icon={<FaTrash />}
      onClick={() => deleteQuestion(i)}
    />
  </Flex>
));
