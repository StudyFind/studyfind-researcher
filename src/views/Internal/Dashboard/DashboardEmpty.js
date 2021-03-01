import React from "react";

import { Link } from "react-router-dom";
import { Alert, AlertIcon, Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function DashboardEmpty() {
  return (
    <Flex h="100%" direction="column">
      <Box w="500px">
        <Heading size="lg">Create your first study</Heading>
        <Text color="gray.500" mt="8px">
          You can add your study using its Clinical Trials ID and begin recruiting and managing
          participants almost instantaneously. StudyFind automates a lot of your work for you.
        </Text>
        <Link to="/fetch">
          <Button mt="40px" leftIcon={<FaPlus />} colorScheme="blue">
            Create Study
          </Button>
        </Link>
      </Box>
      <Box mt="auto">
        <Link to="/welcome">
          <Alert status="info" rounded="md" color="blue.500" mt="auto">
            <AlertIcon />
            Click here to automatically fetch all your studies from clinicaltrials.gov and add them
            to your StudyFind account.
          </Alert>
        </Link>
      </Box>
    </Flex>
  );
}

export default DashboardEmpty;
