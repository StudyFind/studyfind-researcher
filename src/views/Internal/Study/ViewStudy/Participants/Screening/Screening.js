import { Tag, Text, Box, Grid } from "@chakra-ui/react";

function Screening({ questions, responses }) {
  return (
    <Grid gap="15px">
      {questions?.map((question, i) => (
        <Box borderWidth="1px" bg="white" rounded="md" p="10px" key={i}>
          <Tag size="sm" colorScheme={question.type === "Inclusion" ? "green" : "red"}>
            {question.type}
          </Tag>
          <Text fontWeight="600" color="black">
            {question.prompt}
          </Text>
          <Text color="gray.600">
            {(responses && responses.length && responses[i]) || (
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

export default Screening;
