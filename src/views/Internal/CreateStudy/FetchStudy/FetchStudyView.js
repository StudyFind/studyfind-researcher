import React from "react";
import styled from "styled-components";

import { Heading, Text, Button } from "@chakra-ui/core";

import { Input } from "chakra";
import { Form } from "components";

function FetchStudyView({ nctID, error, loading, handleChange, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Heading size="lg" mb="10px">
        Add Study using Clinical Trials ID
      </Heading>
      <Text mb="10px" color="gray.500">
        In an effort to simplify and validate study creation, we require that your research study is
        registered on clinicaltrials.gov. Submitting your Clinical Trials ID below allows us to
        identify your study and add it to your StudyFind account.
      </Text>
      <Inputs>
        <Input
          label="Clinical Trials ID"
          placeholder="NCT00000000"
          value={nctID}
          error={error}
          onChange={handleChange}
        />
        <Button
          mt="10px"
          variantColor="blue"
          loadingText="Fetching..."
          isLoading={loading}
          type="submit"
        >
          Fetch
        </Button>
      </Inputs>
    </Form>
  );
}

const Inputs = styled.div`
  display: grid;
  padding-top: 10px;
  width: 210px;
`;

export default FetchStudyView;
