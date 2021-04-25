import React, { useState } from "react";
import { Box, Button, Text, Flex, Form, Input, Grid, Select } from "@chakra-ui/react";

import Question from "./Question";

function Survey({ surveyInfo }) {
  const [editing, setEditing] = useState(false);
  console.log(editing);
  if (editing) {
    if (surveyInfo.questions.length > 0) {
      return (
        <Box bg="gray.200" p="6px" rounded="md" w="90%" m="6px">
          <Input
            variant="unstyled"
            value={surveyInfo.title}
            mr="auto"
            ml="auto"
            textAlign="center"
            fontSize="large"
            minW="0px"
            maxW="30%"
          ></Input>
          {surveyInfo.questions.map((question, i) => {
            return (
              <Box>
                <Input label="prompt" value={question.prompt}></Input>
                <Select label="type" value={question.type}>
                  <option value="multiple choice">Multiple Choice</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="short response">Short Response</option>
                  <option value="long response">Long Response</option>
                </Select>
              </Box>
            );
          })}
        </Box>
      );
    }
  }
  return (
    <Box w="90%" bg="gray.200" p="6px" m="6px" rounded="md" display="flex">
      <Text fontSize="large" m="auto, 0" h="auto">
        {surveyInfo.title}
      </Text>
      <Button color="white" bg="blue.500" ml="auto" mr="6px" onClick={() => setEditing(true)}>
        Preview
      </Button>
      <Button color="white" bg="blue.500" ml="auto" mr="6px" onClick={() => setEditing(true)}>
        Edit
      </Button>
    </Box>
  );
}

export default Survey;
