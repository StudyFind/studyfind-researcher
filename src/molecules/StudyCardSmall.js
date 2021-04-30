import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import StudyStatus from "./StudyStatus";
import StudyConditions from "./StudyConditions";

function StudyCardSmall({ study }) {
  return (
    <Box borderWidth="1px" overflow="hidden" rounded="md" bg="white" w="100%" h="270px">
      <CardLink to={`/study/${study.id}/details`}>
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
      </CardLink>
    </Box>
  );
}

const CardLink = styled(Link)`
  display: block;
  padding: 20px;
`;

export default StudyCardSmall;
