import React from "react";
import styled from "styled-components";

import { Heading, Text, Box, Grid, Flex, Tag, TagLabel, Avatar } from "@chakra-ui/react";
import { FaVenusMars, FaBirthdayCake, FaHeart } from "react-icons/fa";

function StudyCardLarge({ study }) {
  const { researcher } = study;

  return (
    <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white" p="20px">
      <Text fontSize="sm" color="gray.400">
        {study.id}
      </Text>
      <Heading size="md" mt="5px">
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
      <Text color="gray.500" my="15px">
        {study.description}
      </Text>
      <Flex justify="space-between" align="flex-end">
        <Grid gap="10px">
          <Criterion>
            <Box as={FaVenusMars} color="blue.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.sex || "All"}
            </Text>
          </Criterion>
          <Criterion>
            <Box as={FaBirthdayCake} color="blue.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.age || "All"} years
            </Text>
          </Criterion>
          <Criterion>
            <Box as={FaHeart} color="blue.500" size="16px" />
            <Text fontWeight="500" fontSize="sm">
              {study.control === "Yes"
                ? "Accepts Healthy Volunteers"
                : "Does not accept healthy volunteers"}
            </Text>
          </Criterion>
        </Grid>
        {researcher && (
          <Flex
            gridGap="10px"
            align="flex-end"
            borderWidth="1px"
            rounded="md"
            overflow="hidden"
            bg="white"
            p="12px"
          >
            <Avatar color="white" bg="blue.500" name={researcher.name} />
            <Box>
              <Text>{researcher.name}</Text>
              <Text color="gray.500">
                <a href={`mailto:${researcher.email}`}>{researcher.email}</a>
              </Text>
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

const Criterion = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
`;

export default StudyCardLarge;
