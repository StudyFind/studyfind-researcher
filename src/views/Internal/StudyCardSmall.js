import React from "react";

import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Tag,
  TagLabel,
  Badge,
} from "@chakra-ui/react";

function StudyCardSmall({ study }) {
  return (
    <Box
      borderWidth="1px"
      rounded="md"
      overflow="hidden"
      bg="white"
      w="100%"
      h="270px"
    >
      <Link
        style={{ padding: "20px", display: "block" }}
        to={`/study/${study.id}/details`}
      >
        <Flex justify="space-between" align="center" mb="8px">
          <Text fontSize="sm" color="gray.400">
            {study.id}
          </Text>
          <Badge colorScheme={study.published ? "green" : "red"}>
            {study.published ? "Published" : "Unpublished"}
          </Badge>
        </Flex>
        <Heading size="sm" mt="5px" noOfLines={2}>
          {study.title}
        </Heading>
        <Flex mt="6px" gridGap="4px" flexWrap="wrap" h="24px" overflow="hidden">
          {study.conditions &&
            study.conditions.map((condition, index) => (
              <Tag key={index} variant="solid" size="sm" colorScheme="blue">
                <TagLabel>{condition}</TagLabel>
              </Tag>
            ))}
        </Flex>
        <Text color="gray.500" my="10px" noOfLines={5}>
          {study.description}
        </Text>
      </Link>
    </Box>
  );
}

export default StudyCardSmall;
