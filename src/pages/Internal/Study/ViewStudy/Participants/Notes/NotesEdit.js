import { useState, useEffect } from "react";
import { object } from "utils";

import { TextInput, TextareaInput, SecondaryButton } from "components";
import { Flex, Grid, Button } from "@chakra-ui/react";

function NotesEdit({ note, handleCreate, handleUpdate, handleCancel }) {
  const [values, setValues] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });

  useEffect(() => {
    if (note) {
      const { title, body } = note;
      setValues({ title, body });
      setErrors({ title: !title, body: !body });
    }
  }, [note]);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: !value });
  };

  const handleSubmit = () => {
    const error = {
      title: !values.title,
      body: !values.body,
    };

    if (object.some(error)) {
      setErrors(error);
      return;
    }

    const data = {
      title: values.title,
      body: values.body,
      time: Date.now(),
    };

    if (note) {
      handleUpdate(note.id, data);
    } else {
      handleCreate(data);
    }

    handleCancel();
  };

  return (
    <Grid gap="20px" padding="20px">
      <TextInput
        label="Title"
        name="title"
        value={values.title}
        error={errors.title}
        onChange={handleChange}
      />
      <TextareaInput
        label="Body"
        name="body"
        value={values.body}
        error={errors.body}
        onChange={handleChange}
        limit={400}
        height="100px"
      />
      <Flex gridGap="10px" justify="flex-end">
        <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Save
        </Button>
      </Flex>
    </Grid>
  );
}

export default NotesEdit;
