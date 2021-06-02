import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "components";

function Publish({ study }) {
  return (
    <Box p="20px">
      <Heading mb="8px" size="md">
        Publish Study
      </Heading>
      <Text color="gray.500" my="8px">
        Once your study is published participants will be able to enroll for it; however, you will
        no longer be able to edit the study title, description, and screening survey.
      </Text>
      <Link to={`/create/${study.id}/details`} isWrapper>
        <Button colorScheme="green">Publish</Button>
      </Link>
    </Box>
  );
}

export default Publish;
