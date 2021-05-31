import React, { useState } from "react";

import { datetime } from "functions";
import { updateStudy } from "database/cloud";

import { Link } from "components";
import { Box, Flex, Heading, Text, Button, FormErrorMessage } from "@chakra-ui/react";

function Update({ study }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = () => {
    setLoading(true);
    updateStudy(study.id)
      .catch((err) => setError(`Update failed: ${err}`))
      .finally(() => setLoading(false));
  };

  return (
    <Box p="20px">
      <Heading mb="8px" size="md">
        Update Study
      </Heading>
      <Text color="gray.500" my="8px">
        Updating your study will retrieve any new data from{" "}
        <Link to="https://clinicaltrials.gov">clinicaltrials.gov</Link> and update its information
        accordingly. <br />
        This action will not overwrite your edited study details and screening survey.
      </Text>
      <Flex mt="16px" mb="8px">
        <Text color="black" fontWeight="500">
          Last Updated:
        </Text>
        <Text color="gray.500" ml="4px">
          {datetime.getFriendlyDate(study.updatedAt)}
        </Text>
      </Flex>
      <Button
        type="submit"
        onClick={handleUpdate}
        colorScheme="blue"
        isLoading={loading}
        loadingText="Updating"
      >
        Update
      </Button>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </Box>
  );
}

export default Update;
