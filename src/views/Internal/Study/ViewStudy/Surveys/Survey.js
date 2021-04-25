import React, { useState } from "react";
import { Box, Button, Text, Flex, Form, Input } from "@chakra-ui/react";

import Question from "./Question";

function Survey({ surveyInfo }) {
  const [editing, setEditing] = useState(false);
  console.log(editing);
  if (editing) {
    if (surveyInfo.questions.length > 0) {
      return (
        <Box bg="gray.200" p="6px" rounded="md" w="90%" m="6px">
          <Text mr="auto" ml="auto" fontSize="large" minW="0px" maxW="30%">
            {surveyInfo.title}
          </Text>
          {surveyInfo.questions.map((question, i) => {
            return <Question question={question}></Question>;
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
        Edit
      </Button>
    </Box>
  );
}

export default Survey;
