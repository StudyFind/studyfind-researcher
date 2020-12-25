import React from "react";
import { Text, Button, Heading, Grid, Flex } from "@chakra-ui/react";
import { Form, Textarea } from "components";
import DescriptionAccessibilityScore from "views/Internal/Study/DescriptionAccessibilityScore";

function DetailsView({ inputs, errors, handleChange, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Heading size="lg" mb="10px">
        Modifying Title and Description
      </Heading>
      <Text mb="10px" color="gray.500">
        StudyFind strives to make research studies as accessible as possible. To achieve this, we
        ask that researchers simplify the language used in the study description by avoiding medical
        jargon and making it readable for the general population to improve their partipant
        recruitment
      </Text>
      <Grid py="10px" gap="10px">
        <Textarea
          label="Study Title"
          name="title"
          type="textarea"
          value={inputs.title}
          error={errors.title}
          limit={100}
          height="60px"
          onChange={handleChange}
        />
        <Textarea
          label="Study Description"
          name="description"
          type="textarea"
          value={inputs.description}
          error={errors.description}
          limit={500}
          height="150px"
          onChange={handleChange}
        />
        <DescriptionAccessibilityScore description={inputs.description} />
      </Grid>
      <Flex justify="flex-end">
        <Button mt="20px" ml="auto" colorScheme="blue" type="submit" style={{ textAlign: "right" }}>
          Submit
        </Button>
      </Flex>
    </Form>
  );
}

export default DetailsView;
