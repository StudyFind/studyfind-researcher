import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

function Publish({ study }) {
  const history = useHistory();

  return (
    <Box p="20px" borderBottom="1px solid #f1f2f3">
      <Heading mb="8px" size="md">
        Publish Study
      </Heading>
      <Text color="gray.500" my="8px">
        Once your study is published participants will be able to enroll for it; however, you will
        no longer be able to edit the study title, description, and screening survey.
      </Text>
      <Button colorScheme="green" onClick={() => history.push(`/create/${study.id}/details`)}>
        Publish
      </Button>
    </Box>
  );
}

export default Publish;
