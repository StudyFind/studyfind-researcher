import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { Form, Input } from "components";
import { Heading, Text, Button, Box, useToast } from "@chakra-ui/react";

import { deleteStudy } from "database/studies";

function Delete({ study }) {
  const toast = useToast();
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (name, value) => {
    setNctID(value);
    setError("");
  };

  const handleDelete = () => {
    if (nctID === study.id) {
      setLoading(true);
      deleteStudy(study.id)
        .then(() => {
          history.push("/studies");
          toast({
            title: "Study Deleted!",
            description: `Your study was successfully deleted along with all information`,
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
              "Your study could not be deleted due to a connection error. Please check your internet connection and try again.",
            status: "error",
            duration: 2500,
            isClosable: true,
            position: "top",
          });
        })
        .finally(() => setLoading(false));
    } else {
      setError("Entered ID does not match");
    }
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
        <Input placeholder="NCT00000000" value={nctID} error={error} onChange={handleChange} />
        <Button type="submit" colorScheme="red" isLoading={loading} loadingText="Deleting...">
          Delete
        </Button>
      </DeleteForm>
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
