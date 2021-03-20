import React from "react";
import styled from "styled-components";
import { firestore } from "database/firebase";
import { useHistory } from "react-router-dom";
import { Flex, Heading, Text, Button, useToast } from "@chakra-ui/react";
import { FaBan, FaCheck } from "react-icons/fa";

function WelcomeStudy({ study }) {
  const toast = useToast();
  const history = useHistory();

  const handleRemove = () => {
    firestore
      .collection("studies")
      .doc(study.id)
      .delete()
      .then(() => {
        toast({
          title: "Study Removed",
          description:
            "This study has been removed from your StudyFind account. If this was a mistake you may re-create the study using its NCT ID from your dashboard.",
          status: "info",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      })
      .catch(() => {
        toast({
          title: "Connection Error",
          description:
            "Your study could not be deleted due to a connection error. Please try again later.",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleAccept = () => {
    history.push(`/create/${study.id}/details?from=welcome`);
  };

  return (
    <>
      <Text fontSize="sm" fontWeight="500" color="gray.500" mx="8px">
        {study.id}
      </Text>
      <Title fontSize="md" fontWeight="600" mr="auto">
        {study.title}
      </Title>
      <Flex minW="240px" justify="flex-end" gridGap="8px">
        <Button
          leftIcon={<FaBan />}
          colorScheme=""
          color="gray.500"
          bg="gray.100"
          _hover={{ bg: "gray.200" }}
          onClick={handleRemove}
        >
          Remove
        </Button>
        <Button leftIcon={<FaCheck />} colorScheme="green" onClick={handleAccept}>
          Accept
        </Button>
      </Flex>
    </>
  );
}

const Title = styled(Heading)`
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-height: 100%; /* fallback */
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export default WelcomeStudy;
