import React from "react";

import { datetime } from "functions";

import { Text, Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function NotesItem({ note, editNote, deleteNote }) {
  const displayDate = datetime.getFriendlyDate(note.time);
  const displayTime = datetime.get12HourTime(note.time);

  return (
    <Box borderWidth="1px" bg="white" rounded="md" p="15px">
      <Text color="gray.600">{note.user}</Text>
      <Heading size="md" mb="8px">
        {note.title}
      </Heading>
      <Text>{note.body}</Text>
      <Flex justify="space-between" align="center" mt="16px">
        <Flex gridGap="4px">
          <IconButton
            icon={<FaPencilAlt />}
            size="sm"
            color="blue.500"
            bg="blue.100"
            onClick={() => editNote(note)}
          />
          <IconButton
            icon={<FaTrashAlt />}
            size="sm"
            color="red.500"
            bg="red.100"
            onClick={() => deleteNote(note)}
          />
        </Flex>
        <Text color="gray.500" fontSize="0.9rem">
          {displayDate} at {displayTime}
        </Text>
      </Flex>
    </Box>
  );
}

export default NotesItem;
