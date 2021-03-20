import React, { useState } from "react";
import moment from "moment";

import { auth, firestore } from "database/firebase";

import { Form, Input, Textarea } from "components";
import { Box, Flex, Grid, Heading, Text, Button, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

function Feedback() {
  const toast = useToast();

  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: false, body: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: !value }));
  };

  console.log(moment().valueOf());

  const handleSubmit = () => {
    const err = {
      title: !inputs.title,
      body: !inputs.body,
    };

    if (err.title || err.body) {
      setErrors(err);
      return;
    }

    setLoading(true);

    firestore
      .collection("feedback")
      .add({
        title: inputs.title,
        body: inputs.body,
        email: auth.currentUser.email,
        timestamp: moment().valueOf(),
      })
      .then(() => {
        setInputs({ title: "", body: "" });
        setErrors({ title: false, body: false });
        toast({
          title: "Thank you for your feedback!",
          description:
            "Your feedback was successfully sent and we will be reviewing it carefully. Thank you for taking the time to help make StudyFind work better :)",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch(() => {
        toast({
          title: "Connection Error!",
          description:
            "Your feedback could not be sent because of a connection error. Please check your internet connection and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => setLoading(false));
  };

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
          <Input
            label="Title"
            name="title"
            value={inputs.title}
            error={errors.title}
            onChange={handleChange}
          />
          <Textarea
            label="Body"
            name="body"
            height="150px"
            value={inputs.body}
            error={errors.body}
            onChange={handleChange}
          />
          <Flex justify="flex-end">
            <Button
              type="submit"
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
