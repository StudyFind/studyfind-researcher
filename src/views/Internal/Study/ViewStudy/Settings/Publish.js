import React, { useState } from "react";

import { Confirm } from "components";
import { Box, Heading, Text, Button, FormErrorMessage, useToast } from "@chakra-ui/react";
import { updateStudy } from "database/studies";

function Update({ study }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handlePublish = () => {
    setLoading(true);
    updateStudy(study.id, { ...study, published: true, activated: true })
      .then(() => {
        toast({
          title: "Study Published!",
          description:
            "Your study was successfully published is now available for participants to view and enroll",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      })
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return (
    <Box p="20px" borderBottom="1px solid #f1f2f3">
      <Heading mb="8px" size="md">
        Publish Study
      </Heading>
      <Text color="gray.500" my="8px">
        Once your study is published participants will be able to enroll for it; however, you will
        no longer be able to edit the study title, description, and screening survey.
      </Text>
      <Button
        type="submit"
        onClick={() => setOpen(true)}
        colorScheme="green"
        isLoading={loading}
        loadingText="Updating"
      >
        Publish
      </Button>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      <Confirm
        title="Publish Study"
        buttonText="Publish"
        loading={loading}
        loadingText="Publishing"
        color="green"
        open={open}
        setOpen={setOpen}
        handleConfirm={handlePublish}
      >
        Are you sure you want to publish study <b>{study.id}</b>?
        <br />
        <br />
        Once the study is published, you will not be able to edit the study title, description, and
        screening survey.
      </Confirm>
    </Box>
  );
}

export default Update;
