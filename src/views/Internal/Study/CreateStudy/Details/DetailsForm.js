import React from "react";
import { Form, Textarea } from "components";
import { Button, Grid, Flex } from "@chakra-ui/react";
import DescriptionAccessibilityScore from "views/Internal/Study/DescriptionAccessibilityScore";

function DetailsForm({ inputs, errors, handleChange, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Grid py="10px" gap="10px">
        <Textarea
          label="Study Title"
          name="title"
          value={inputs.title}
          error={errors.title}
          limit={100}
          height="60px"
          onChange={handleChange}
        />
        <Textarea
          label="Study Description"
          name="description"
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

export default DetailsForm;
