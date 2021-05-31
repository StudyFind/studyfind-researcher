import React from "react";
import { TextInput, TextareaInput } from "components";
import { Flex, Grid, Button } from "@chakra-ui/react";

function NotesForm({ inputs, errors, handleCancel, handleChange, handleSubmit }) {
  return (
    <Grid gap="20px">
      <TextInput
        label="Title"
        name="title"
        value={inputs.title}
        error={errors.title}
        onChange={handleChange}
      />
      <TextareaInput
        label="Body"
        name="body"
        value={inputs.body}
        error={errors.body}
        onChange={handleChange}
        limit={400}
        height="100px"
      />
      <Flex gridGap="10px" justify="flex-end">
        <Button variant="outline" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={() => handleSubmit()}>
          Save
        </Button>
      </Flex>
    </Grid>
  );
}

export default NotesForm;
