import React from "react";
import styled from "styled-components";

import { Form } from "components";
import { Textarea } from "chakra";
import { Text, Button, Heading } from "@chakra-ui/core";

function ModifyFieldsView({ inputs, errors, handleChange, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Heading size="lg" mb="10px">
        Modifying Title and Description
      </Heading>
      <Text mb="10px" color="gray.500">
        We at StudyFind strive to make research studies as accessible as possible. To achieve this,
        we ask that researchers simplify the language used in the study description by avoiding
        medical jargon and making it readable for the general population to improve their partipant
        recruitment
      </Text>
      <Inputs>
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
      </Inputs>
      <Buttons>
        <Button
          mt="20px"
          ml="auto"
          variantColor="teal"
          type="submit"
          style={{ textAlign: "right" }}
        >
          Submit
        </Button>
      </Buttons>
    </Form>
  );
}

const Inputs = styled.div`
  display: grid;
  padding-top: 10px;
  grid-gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
  justify-content: flex-end;
`;

export default ModifyFieldsView;
