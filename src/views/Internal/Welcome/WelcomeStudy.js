import React from "react";
import styled from "styled-components";
import { Flex, Text, Button } from "@chakra-ui/react";
import { FaBan, FaCheck } from "react-icons/fa";

function WelcomeStudy({ study }) {
  return (
    <>
      <Text fontSize="sm" color="gray.400" mx="8px">
        {study.id}
      </Text>
      <Title fontSize="md" fontWeight="600" mr="auto">
        {study.title}
      </Title>
      <Flex minW="240px" justify="flex-end" gridGap="8px">
        <Button leftIcon={<FaBan />} colorScheme="" color="gray.500" _hover={{ bg: "gray.100" }}>
          Remove
        </Button>
        <Button leftIcon={<FaCheck />} colorScheme="green">
          Accept
        </Button>
      </Flex>
    </>
  );
}

const Title = styled(Text)`
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-height: 100%; /* fallback */
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export default WelcomeStudy;
