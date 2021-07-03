import { Link } from "@studyfind/components";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import StudyStatus from "./StudyStatus";
import StudyConditions from "./StudyConditions";

function StudyCardSmall({ study }) {
  return (
    <Link to={`/study/${study.id}/details`} isWrapper>
      <Box borderWidth="1px" overflow="hidden" rounded="md" bg="white" w="100%" p="20px" h="270px">
        <Flex justify="space-between" align="center" mb="8px">
          <Text fontSize="sm" color="gray.400">
            {study.id}
          </Text>
          <StudyStatus published={study.published} />
        </Flex>
        <Heading size="sm" noOfLines={2} mb="6px">
          {study.title}
        </Heading>
        <StudyConditions conditions={study.conditions} />
        <Text color="gray.500" noOfLines={5} mt="10px">
          {study.description}
        </Text>
      </Box>
    </Link>
  );
}

export default StudyCardSmall;
