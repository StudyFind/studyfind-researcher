import React from "react";

import { auth } from "database/firebase";
import { Link } from "react-router-dom";
import { Alert, AlertIcon, Box, Flex, Heading, Text } from "@chakra-ui/react";

import DashboardButton from "./DashboardButton";

function DashboardEmpty() {
  const verified = auth.currentUser.emailVerified;

  return (
    <Flex h="100%" direction="column">
      <Box w="500px">
        <Heading size="lg">Create your first study</Heading>
        <Text color="gray.500" mt="8px" mb="30px">
          You can add your study using its Clinical Trials ID and begin recruiting and managing
          participants almost instantaneously. StudyFind automates a lot of your work for you.
        </Text>
        <DashboardButton verified={verified} />
      </Box>
      {verified && (
        <Box mt="auto">
          <Link to="/welcome">
            <Alert status="info" rounded="md" color="blue.500" mt="auto">
              <AlertIcon />
              Click here to automatically fetch all your studies from clinicaltrials.gov and add
              them to your StudyFind account.
            </Alert>
          </Link>
        </Box>
      )}
    </Flex>
  );
}

export default DashboardEmpty;
