import React, { useState } from "react";

import { deleteStudy } from "database/studies";
import { useHistory } from "react-router-dom";
import { useConfirm } from "hooks";

import { Form, Input } from "components";
import { Box, Grid, Heading, Text, Button, useToast } from "@chakra-ui/react";

function Delete({ study }) {
  const toast = useToast();
  const confirm = useConfirm();
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleChange = (_, value) => {
    setNctID(value);
    setError("");
  };

  const handleDelete = () => {
    if (nctID === study.id) {
      confirm({
        title: "Delete Study",
        description: `This is a permanant action and cannot be undone. Are you sure you want to delete study with study number ${nctID}?`,
        color: "red",
        button: "Delete",
        handleConfirm,
      });
    } else {
      setError("Entered ID does not match");
    }
  };

  const handleConfirm = () => {
    return deleteStudy(study.id)
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
      });
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

      <Form onSubmit={handleDelete}>
        <Grid gap="10px" w="210px">
          <Input placeholder="NCT00000000" value={nctID} error={error} onChange={handleChange} />
          <Button type="submit" colorScheme="red">
            Delete
          </Button>
        </Grid>
      </Form>
    </Box>
  );
}

export default Delete;
