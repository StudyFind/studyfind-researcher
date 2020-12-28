import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";
import { Input, Textarea } from "components";
import { Flex, Grid, Heading, Button } from "@chakra-ui/react";

function NotesNew({ setAdd }) {
  const { studyID, userID } = useParams();

  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });

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

    firestore
      .collection("studies")
      .doc(studyID)
      .collection("participants")
      .doc(userID)
      .collection("notes")
      .add({
        title: inputs.title,
        body: inputs.body,
        time: Date.now(),
      });
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
        <Button variant="outline" onClick={() => setAdd(false)}>
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
