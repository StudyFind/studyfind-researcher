import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

function NotesNew({ newNote }) {
  return (
    <Flex
      h="136px"
      rounded="md"
      borderWidth="1px"
      borderColor="gray.300"
      borderStyle="dashed"
      bg="gray.100"
      justify="center"
      align="center"
      cursor="pointer"
      onClick={newNote}
    >
      <Heading size="md" color="gray.500">
        <Flex justify="center" align="center" gridGap="8px">
          <FaPlusCircle />
          New Note
        </Flex>
      </Heading>
    </Flex>
  );
}

export default NotesNew;
