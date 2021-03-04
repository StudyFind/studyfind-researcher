import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Box, Flex, Heading, Text, Tag, TagLabel, Badge } from "@chakra-ui/react";

function StudyCardSmall({ study }) {
  return (
    <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white" w="100%" h="270px">
      <Card to={`/study/${study.id}`}>
        <Flex justify="space-between" align="center" mb="8px">
          <Text fontSize="sm" color="gray.400">
            {study.id}
          </Text>
          <Badge colorScheme={study.published ? "green" : "red"}>
            {study.published ? "Published" : "Unpublished"}
          </Badge>
        </Flex>
        <Title size="sm" mt="5px">
          {study.title}
        </Title>
        <Flex mt="6px" gridGap="4px" flexWrap="wrap" h="24px" overflow="hidden">
          {study.conditions &&
            study.conditions.map((condition, index) => (
              <Tag key={index} variant="solid" size="sm" colorScheme="blue">
                <TagLabel>{condition}</TagLabel>
              </Tag>
            ))}
        </Flex>
        <Description color="gray.500" my="10px">
          {study.description}
        </Description>
      </Card>
    </Box>
  );
}

const Title = styled(Heading)`
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-height: 100%; /* fallback */
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const Description = styled(Text)`
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-height: 100%; /* fallback */
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const Card = styled(Link)`
  padding: 20px;
  display: block;
`;

export default StudyCardSmall;
