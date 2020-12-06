import React, { useState } from "react";
import styled from "styled-components";
import { Form } from "components";
import { Heading, Text, Button, FormErrorMessage } from "@chakra-ui/react";
import { resetStudy } from "database/studies";

function Reset({ study }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = () => {
    setLoading(true);
    resetStudy(study.nctID)
      .then(console.log)
      .catch((err) => {
        console.log(err);
        setError(`Reset failed: ${err}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Section>
      <Heading mb="8px" size="md">
        Reset Study Data
      </Heading>

      <Text color="gray.500" my="8px">
        Resetting the study will retrieve any new data clinicaltrials.gov and update it accordingly.
        This action will not overwrite your edited study title, description and survey questions.
      </Text>

      <Form onSubmit={handleReset}>
        <Button type="submit" colorScheme="blue" isLoading={loading} loadingText="Updating">
          Reset
        </Button>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </Form>
    </Section>
  );
}

const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #f1f2f3;
`;

export default Reset;
