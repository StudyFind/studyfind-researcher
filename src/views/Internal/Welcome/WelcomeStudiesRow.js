import React from "react";
import styled from "styled-components";
import { Text, Button } from "@chakra-ui/react";
import { FaBan, FaPlusCircle } from "react-icons/fa";

function WelcomeStudiesRow({ study }) {
  return (
    <>
      <Text fontSize="sm" color="gray.500" mx="8px">
        {study.id}
      </Text>
      <Title fontSize="sm" color="gray.700" fontWeight="600" mr="auto">
        {study.title}
      </Title>
      <Button leftIcon={<FaBan />} colorScheme="" color="gray.500" _hover={{ bg: "gray.100" }}>
        Remove
      </Button>
      <Button leftIcon={<FaPlusCircle />} colorScheme="blue">
        Create
      </Button>
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

export default WelcomeStudiesRow;
