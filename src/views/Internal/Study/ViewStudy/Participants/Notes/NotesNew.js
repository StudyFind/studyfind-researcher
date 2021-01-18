import React from "react";
import { useParams } from "react-router-dom";
import { Input, Textarea } from "components";
import { Flex, Grid, Heading, Button } from "@chakra-ui/react";

function NotesNew({
  inputs,
  errors,
  cancelNewNote,
  handleNoteChange,
  handleSubmit,
}) {
  return (
    <Grid gap="20px">
      <Heading size="lg">New Note</Heading>
      <Input
        label="Title"
        name="title"
        value={inputs.title}
        error={errors.title}
        onChange={handleNoteChange}
      />
      <Textarea
        label="Body"
        name="body"
        value={inputs.body}
        error={errors.body}
        onChange={handleNoteChange}
        limit={400}
        height="100px"
      />
      <Flex gridGap="10px" justify="flex-end">
        <Button variant="outline" onClick={() => cancelNewNote()}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={() => handleSubmit()}>
          Save
        </Button>
      </Flex>
    </Grid>
  );
}

export default NotesNew;
