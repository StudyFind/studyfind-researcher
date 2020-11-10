import React from "react";
import styled from "styled-components";

import { Heading, Text, Box, Tag, TagLabel, Stack, Button } from "@chakra-ui/core";
import { FaVenusMars, FaBirthdayCake, FaHeart } from "react-icons/fa";

function StudyCardLarge({ study }) {
  return (
    <Study borderWidth="1px" rounded="lg" overflow="hidden" bg="white" p="25px">
      <Text fontSize="sm" color="gray.400">
        {study.nctID}
      </Text>
      <Heading size="md" mt="5px">
        {study.title}
      </Heading>
      <Conditions spacing={1} isInline mt="6px">
        {study.conditions &&
          study.conditions.map((condition, index) => (
            <Condition key={index} variant="solid" size="sm" variantColor="teal">
              <TagLabel>{condition}</TagLabel>
            </Condition>
          ))}
      </Conditions>
      <Text color="gray.500" my="15px">
        {study.description}
      </Text>
      <Eligibility>
        <Criterion>
          <Box as={FaVenusMars} color="teal.500" size="16px" />
          <Text fontWeight="500" fontSize="sm">
            {study.sex}
          </Text>
        </Criterion>
        <Criterion>
          <Box as={FaBirthdayCake} color="teal.500" size="16px" />
          <Text fontWeight="500" fontSize="sm">
            {study.age} years
          </Text>
        </Criterion>
        <Criterion>
          <Box as={FaHeart} color="teal.500" size="16px" />
          <Text fontWeight="500" fontSize="sm">
            {study.control === "Yes" && "Accepts Healthy Volunteers"}
          </Text>
        </Criterion>
      </Eligibility>
    </Study>
  );
}

const Study = styled(Box)``;

const Conditions = styled(Stack)`
  display: grid;
`;

const Condition = styled(Tag)``;

const Eligibility = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Criterion = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
`;

export default StudyCardLarge;
