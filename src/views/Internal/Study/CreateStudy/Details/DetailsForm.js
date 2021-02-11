import React from "react";
import { Form, Textarea } from "components";
import { Button, Grid, Flex } from "@chakra-ui/react";
import { FaUndo } from "react-icons/fa";
import lodash from "lodash";
import DescriptionAccessibilityScore from "views/Internal/Study/DescriptionAccessibilityScore";

function DetailsForm({ back, inputs, errors, original, handleCancel, handleChange, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      {!lodash.isEqual(original, inputs) && (
        <Button leftIcon={<FaUndo />} colorScheme="gray" color="gray.500" onClick={handleCancel}>
          Undo Changes
        </Button>
      )}
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
      </Grid>
      <Flex justify="flex-end" mt="20px" gridGap="10px">
        <Button
          colorScheme="gray"
          color="gray.500"
          variant="outline"
          style={{ textAlign: "right" }}
          onClick={back}
        >
          Back
        </Button>
        <Button colorScheme="blue" type="submit" style={{ textAlign: "right" }}>
          Next
        </Button>
      </Flex>
    </Form>
  );
}

export default DetailsForm;
