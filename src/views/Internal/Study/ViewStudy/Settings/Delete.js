import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Form, Input } from "components";
import {
  Heading,
  Text,
  Button,
  Box,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { deleteStudy } from "database/studies";

function Delete({ study }) {
  const toast = useToast();
  const [studyID, setNctID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const history = useHistory();

  const handleChange = (name, value) => {
    setNctID(value);
    setError("");
  };

  const handleCancel = () => {
    setIsOpen(false);
    setNctID("");
  };

  const handleDelete = () => {
    if (studyID === study.id) {
      setIsOpen(true);
    } else {
      setError("Entered ID does not match");
    }
  };

  const handleConfirm = () => {
    setLoading(true);
    deleteStudy(study.id)
      .then(() => {
        history.push("/studies");
        toast({
          title: "Study Deleted!",
          description: `Your study was successfully deleted along with all associated data`,
          status: "error",
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
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box p="20px">
      <Heading size="md">Delete Study</Heading>

      <Text my="8px" color="gray.500">
        Deleting your study will erase all data associated with your research study. This is a
        permanant action and cannot be undone.
      </Text>

      <Text mt="24px" mb="8px" color="gray.500">
        Please type <strong>{study.id}</strong> to confirm:
      </Text>

      <DeleteForm onSubmit={handleDelete}>
        <Input placeholder="NCT00000000" value={studyID} error={error} onChange={handleChange} />
        <Button type="submit" colorScheme="red">
          Delete
        </Button>
      </DeleteForm>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={handleCancel} size="lg">
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Study
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete study <b>{studyID}</b>?
              <br />
              This is a permanant action and cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancel}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3} isLoading={loading}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

const DeleteForm = styled(Form)`
  display: grid;
  grid-gap: 10px;
  width: 100%;
  width: 210px;
`;

export default Delete;
