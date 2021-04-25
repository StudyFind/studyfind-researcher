import React, { useState } from "react";
import { Box, Text, Button, Input, Select } from "@chakra-ui/react";
import { Form } from "components";

function Question({ question }) {
  const [editing, setEditing] = useState(false);
  if (editing) {
    return (
      <Box bg="gray.300" rounded="md" display="flex">
        <Form>
          <Input placeholder="prompt"></Input>
          <Select placeholder="Question Type">Question Type:</Select>
        </Form>
      </Box>
    );
  }
  return (
    <Box bg="gray.300" rounded="md" p="6px" m="6px">
      <Box display="flex" flexWrap="wrap">
        <Text>{question.prompt}</Text>
        <Text ml="auto" pr="10px">
          {question.type}
        </Text>
        <Button bg="blue.500" color="white" onClick={() => setEditing(true)}>
          Edit Question
        </Button>
      </Box>
      {question.options && (
        <Text flexBasis="100%" flexWrap="wrap">
          {question.options.map((option) => {
            return <Text>{option}</Text>;
          })}
        </Text>
      )}
    </Box>
  );
}

export default Question;
