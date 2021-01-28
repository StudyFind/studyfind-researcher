import React from "react";

import { format } from "functions";

import { Text, Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function NotesItem({ note, editNote, deleteNote }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const [hours, minutes] = [date.getHours(), date.getMinutes()];
    const formattedDate = format.date(date);
    const formattedTime = format.time(`${hours}:${minutes}`);
    return `${formattedDate} at ${formattedTime}`;
  };

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
          {formatTimestamp(note.time)}
        </Text>
      </Flex>
    </Box>
  );
}

export default NotesItem;
