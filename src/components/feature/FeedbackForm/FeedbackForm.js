import { useState } from "react";
import { Form, TextInput, TextareaInput } from "components";
import { Box, Flex, Grid, Heading, Text, Button } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

function FeedbackForm({ onSubmit }) {
  // `onSubmit` must be a promise
  const [values, setValues] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);

  const check = (name, value) => {
    if (!value && name === "title") return "Title cannot be empty";
    if (!value && name === "body") return "Body cannot be empty";
    return "";
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };

  const handleSubmit = () => {
    const { title, body } = values;

    const error = {
      title: check("title", title),
      body: check("body", body),
    };

    if (error.title || error.body) {
      setErrors(error);
      return;
    }

    setLoading(true);
    onSubmit({ title, body })
      .then(() => setValues({ title: "", body: "" }))
      .finally(() => setLoading(false));
  };

  return (
    <Grid gap="20px">
      <Box>
        <Heading size="lg" marginBottom="8px">
          Feedback
        </Heading>
        <Text maxWidth="400px" color="gray.500">
          Here is your opportunity to give us feedback about our software. Please elaborate on your
          experiences, including which feature of the software you may be referring to. Thank you!
        </Text>
      </Box>
      <Form onSubmit={handleSubmit}>
        <Grid gap="20px" maxWidth="400px">
          <TextInput
            label="Title"
            name="title"
            value={values.title}
            error={errors.title}
            onChange={handleChange}
          />
          <TextareaInput
            label="Body"
            name="body"
            height="150px"
            value={values.body}
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

export default FeedbackForm;
