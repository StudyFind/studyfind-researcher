import { useState } from "react";

import { toasts } from "templates";
import { firestore } from "database/firebase";
import { useHistory } from "react-router-dom";
import { useConfirm } from "hooks";

import { Form, TextInput } from "@studyfind/components";
import { Box, Grid, Heading, Text, Button, Tooltip, useToast } from "@chakra-ui/react";

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

  const handleConfirm = () => {
    return firestore
      .collection("studies")
      .doc(study.id)
      .delete()
      .then(() => {
        history.push("/studies");
        toast(toasts.deletedStudy);
      })
      .catch(() => {
        toast(toasts.connectionError);
      });
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
          <TextInput
            placeholder="NCT00000000"
            value={nctID}
            error={error}
            onChange={handleChange}
          />
          <Tooltip label={nctID !== study.id && "Entered ID does not match NCTID"}>
            <Box>
              <Button type="submit" w="100%" colorScheme="red" isDisabled={nctID !== study.id}>
                Delete
              </Button>
            </Box>
          </Tooltip>
        </Grid>
      </Form>
    </Box>
  );
}

export default Delete;
