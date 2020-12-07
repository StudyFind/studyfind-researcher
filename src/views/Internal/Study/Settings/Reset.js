import React, { useState } from "react";
import { Heading, Text, Button, FormErrorMessage, Box } from "components";
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
    <Box p="20px" borderBottom="1px solid #f1f2f3">
      <Heading mb="8px" size="md">
        Reset Study Data
      </Heading>

      <Text color="gray.500" my="8px">
        Resetting the study will retrieve any new data clinicaltrials.gov and update it accordingly.
        This action will not overwrite your edited study title, description and survey questions.
      </Text>
      <Button
        type="submit"
        onClick={handleReset}
        colorScheme="blue"
        isLoading={loading}
        loadingText="Resetting"
      >
        Reset
      </Button>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </Box>
  );
}

export default Reset;
