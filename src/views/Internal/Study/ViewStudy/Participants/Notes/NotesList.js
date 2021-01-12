import React from "react";
import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";
import {
  Text,
  Box,
  Grid,
  Flex,
  Button,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { format } from "functions";
import { FaPencilAlt, FaTrashAlt, FaPlusCircle } from "react-icons/fa";

function NoteList({ id, notes, setAdd, inputs, setInputs, setNotesID }) {
  const { nctID } = useParams();
  const timeConvention = (time) => {
    const thisDate = new Date(time);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = thisDate.getFullYear();
    const month = months[thisDate.getMonth()];
    const date = thisDate.getDate();
    const hour = thisDate.getHours();
    const minute = thisDate.getMinutes();
    const sec = thisDate.getSeconds();
    return `${month} ${date} ${year} ${hour}:${minute}:${sec}`;
  };
  const goToEdit = (note) => {
    setInputs({ title: note.title, body: note.body });
    setNotesID(note.id);
    setAdd(true);
  };
  const deleteNote = (note) => {
    firestore
      .collection("studies")
      .doc(nctID)
      .collection("participants")
      .doc(id)
      .collection("notes")
      .doc(note.id)
      .delete();
  };
  return (
    <Grid gap="15px">
      <Flex justify="space-between" align="center">
        <Heading size="lg">Notes</Heading>
        <Button
          leftIcon={<FaPlusCircle />}
          colorScheme="blue"
          onClick={() => setAdd(true)}
        >
          New Note
        </Button>
      </Flex>
      {notes && notes.length
        ? notes.map((note, index) => (
            <Box key={index} borderWidth="1px" bg="white" rounded="md" p="15px">
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
                    onClick={() => goToEdit(note)}
                  />
                  <IconButton
                    icon={<FaTrashAlt />}
                    size="sm"
                    color="red.500"
                    bg="red.100"
                    onClick={() => deleteNote(note)}
                  />
                </Flex>
                <Text color="gray.500" fontSize="0.9rem" fontStyle="italic">
                  {timeConvention(note.time)}
                </Text>
              </Flex>
            </Box>
          ))
        : null}
    </Grid>
  );
}

export default NoteList;
