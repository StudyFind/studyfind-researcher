import { useState } from "react";

import { useHistory } from "react-router-dom";

import { Box, Grid, Heading, Text, Button, Tooltip } from "@chakra-ui/react";
import { Form, TextInput } from "components";

function Delete({ study }) {
  const [studyID, setStudyID] = useState("");
  const [error, setError] = useState("");

  const handleChange = (_, value) => {
    setStudyID(value);
    setError("");
  };

  const handleConfirm = () => {
    // return firestore
    //   .collection("studies")
    //   .doc(study.id)
    //   .delete()
    //   .then(() => {
    //     history.push("/studies");
    //     toast(toasts.deletedStudy);
    //   })
    //   .catch(() => {
    //     toast(toasts.connectionError);
    //   });
  };

  const handleDelete = () => {
    if (studyID === study.id) {
      // confirm({
      //   title: "Delete Study",
      //   description: `This is a permanant action and cannot be undone. Are you sure you want to delete study with study number ${studyID}?`,
      //   color: "red",
      //   button: "Delete",
      //   handleConfirm,
      // });
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
            placeholder="Type here..."
            value={studyID}
            error={error}
            onChange={handleChange}
          />
          <Tooltip label={studyID !== study.id && "Entered ID does not match the study ID"}>
            <Box>
              <Button type="submit" w="100%" colorScheme="red" isDisabled={studyID !== study.id}>
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
