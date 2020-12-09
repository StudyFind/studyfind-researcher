import React from "react";
import { Tag, Heading, Text, Box, Flex, Grid } from "components";
import { compute } from "functions";

function Screen({ questions, responses }) {
  return (
    <Grid gap="15px">
      {questions &&
        questions.length &&
        questions.map((question, index) => (
          <Box borderWidth="1px" bg="white" rounded="md" p="10px" key={index}>
            <Tag size="sm" colorScheme={question.type === "Inclusion" ? "green" : "red"}>
              {question.type}
            </Tag>
            <Text fontWeight="600" color="black">
              {question.prompt}
            </Text>
            <Text color="gray.600">
              {(responses && responses.length && responses[index]) || (
                <Text fontStyle="italic" color="gray.400">
                  no response
                </Text>
              )}
            </Text>
          </Box>
        ))}
    </Grid>
  );
}

export default Screen;
