import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTriggerConfirm, useTriggerToast } from "hooks";

import { study as researchStudy } from "database/mutations";

import { Box, Grid, Heading, Text, Button, Tooltip } from "@chakra-ui/react";
import { Form, TextInput } from "components";
import { toasts } from "templates";

function Delete({ study }) {
  const [studyID, setStudyID] = useState("");

  const history = useHistory();
  const triggerToast = useTriggerToast();
  const triggerConfirm = useTriggerConfirm();

  const handleChange = (_, value) => {
    setStudyID(value);
  };

  const handleConfirm = () => {
    history.push("/");
    return researchStudy
      .delete(study.id)
      .then(() => triggerToast(toasts.deletedStudy))
      .catch(() => triggerToast(toasts.connectionError));
  };

  const handleDelete = () => {
    if (studyID === study.id) {
      triggerConfirm({
        title: "Delete Study",
        description: `Are you sure you want to delete study with ID "${studyID}"?`,
        color: "red",
        button: "Delete",
        handleConfirm,
      });
    }
  };

  return (
    <Box p="20px">
      <Heading size="md">Delete Study</Heading>

      <Text my="8px" color="gray.500">
        Deleting your study will erase all data associated with your research
        study. This is a permanant action and cannot be undone.
      </Text>

      <Text mt="24px" mb="8px" color="gray.500">
        Please type <strong>{study.id}</strong> to confirm:
      </Text>

      <Form onSubmit={handleDelete}>
        <Grid gap="10px" maxW="240px">
          <TextInput
            value={studyID}
            placeholder="Type here..."
            onChange={handleChange}
          />
          <Tooltip
            label={
              studyID !== study.id && "Entered ID does not match the study ID"
            }
          >
            <Box>
              <Button
                type="submit"
                w="100%"
                colorScheme="red"
                isDisabled={studyID !== study.id}
              >
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
