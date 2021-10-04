import { useState, useEffect, useContext } from "react";
import { object } from "utils";

import { TextInput, TextareaInput, SecondaryButton } from "components";
import { Flex, Grid, Button } from "@chakra-ui/react";
import { NotesContext } from "./NotesContext";

function NotesEdit() {
  const { selectedNote, isCreating, isUpdating, handleSave, handleCancel } =
    useContext(NotesContext);

  const isSaving = isCreating || isUpdating;

  const [values, setValues] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });

  useEffect(() => {
    if (selectedNote) {
      const { title, body } = selectedNote;

      setValues({ title, body });
      setErrors({ title: !title, body: !body });
    }
  }, [selectedNote]);

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

    handleSave(values);
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
        <SecondaryButton onClick={handleCancel} isDisabled={isSaving}>
          Cancel
        </SecondaryButton>
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={isSaving}
          loadingText="Saving..."
        >
          Save
        </Button>
      </Flex>
    </Grid>
  );
}

export default NotesEdit;
