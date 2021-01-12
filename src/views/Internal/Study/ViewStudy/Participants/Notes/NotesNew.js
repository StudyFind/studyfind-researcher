import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";
import { Input, Textarea } from "components";
import { Flex, Grid, Heading, Button } from "@chakra-ui/react";
import { sortedLastIndex } from "lodash";

function NotesNew({
  id,
  setAdd,
  inputs,
  setInputs,
  errors,
  setErrors,
  notesID,
  setNotesID,
}) {
  const { nctID } = useParams();

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: !value });
  };

  const validate = ({ title, body }) => ({
    title: !title,
    body: !body,
  });

  const addNote = () => {
    const err = validate(inputs);
    setErrors(err);
    const errorExists = Object.keys(err).some((i) => err[i]);
    if (errorExists) return;
    if (!notesID) {
      firestore
        .collection("studies")
        .doc(nctID)
        .collection("participants")
        .doc(id)
        .collection("notes")
        .add({
          title: inputs.title,
          body: inputs.body,
          time: Date.now(),
        });
    } else {
      firestore
        .collection("studies")
        .doc(nctID)
        .collection("participants")
        .doc(id)
        .collection("notes")
        .doc(notesID)
        .update({
          title: inputs.title,
          body: inputs.body,
          time: Date.now(),
        });
    }
    setAdd(false);
    setNotesID("");
    setInputs({ title: "", body: "" });
    setErrors({ title: "", body: "" });
  };
  const cancelNote = () => {
    setAdd(false);
    setNotesID("");
    setInputs({ title: "", body: "" });
    setErrors({ title: "", body: "" });
  };

  return (
    <Grid gap="20px">
      <Heading size="lg">New Note</Heading>
      <Input
        label="Title"
        name="title"
        value={inputs.title}
        error={errors.title}
        onChange={handleChange}
      />
      <Textarea
        label="Body"
        name="body"
        value={inputs.body}
        error={errors.body}
        onChange={handleChange}
        limit={400}
        height="100px"
      />
      <Flex gridGap="10px" justify="flex-end">
        <Button variant="outline" onClick={() => cancelNote()}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={() => addNote()}>
          Save
        </Button>
      </Flex>
    </Grid>
  );
}

export default NotesNew;
