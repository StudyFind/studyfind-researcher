import React from "react";
import moment from "moment";

import { useForm } from "hooks";
import { toasts } from "templates";
import { auth, firestore } from "database/firebase";

import { Form, TextInput, TextareaInput } from "components";
import { Box, Flex, Grid, Heading, Text, Button, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

function Feedback() {
  const toast = useToast();

  const { inputs, errors, loading, handleChange, handleSubmit } = useForm({
    initial: {
      title: "",
      body: "",
    },

    check: (value) => (value ? "" : " "),

    submit: ({ title, body }) => {
      const email = auth.currentUser.email;
      const time = moment().utc().valueOf();
      const side = "researcher";

      return firestore
        .collection("feedback")
        .add({ title, body, email, time, side })
        .then(() => toast(toasts.providedFeedback));
    },
  });

  return (
    <Grid gap="20px">
      <Box>
        <Heading size="lg" mb="8px">
          Feedback
        </Heading>
        <Text w="400px" color="gray.500">
          Here is your opportunity to give us feedback about our software. Please elaborate on your
          experiences including which feature of the software you may be referring to. Thank you!
        </Text>
      </Box>
      <Form onSubmit={handleSubmit}>
        <Grid gap="20px" w="400px">
          <TextInput
            label="Title"
            name="title"
            value={inputs.title}
            error={errors.title}
            onChange={handleChange}
          />
          <TextareaInput
            label="Body"
            name="body"
            height="150px"
            value={inputs.body}
            error={errors.body}
            onChange={handleChange}
          />
          <Flex justify="flex-end">
            <Button
              colorScheme="blue"
              rightIcon={<FaPaperPlane />}
              isLoading={loading}
              loadingText="Sending..."
            >
              Send Feedback
            </Button>
          </Flex>
        </Grid>
      </Form>
    </Grid>
  );
}

export default Feedback;
