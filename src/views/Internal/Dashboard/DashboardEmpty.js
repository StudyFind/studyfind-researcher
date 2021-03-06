import React from "react";

import { auth } from "database/firebase";
import { Link } from "react-router-dom";
import { Alert, AlertIcon, Box, Flex, Heading, Text, Button, Tooltip } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function DashboardEmpty() {
  const verified = auth.currentUser.emailVerified;

  return (
    <Flex h="100%" direction="column">
      <Box w="500px">
        <Heading size="lg">Create your first study</Heading>
        <Text color="gray.500" mt="8px">
          You can add your study using its Clinical Trials ID and begin recruiting and managing
          participants almost instantaneously. StudyFind automates a lot of your work for you.
        </Text>
        <Tooltip
          label={!verified && "You must verify your email before you can create any studies"}
          placement="right"
        >
          <Link to="/fetch">
            <Button mt="40px" isDisabled={!verified} leftIcon={<FaPlus />} colorScheme="blue">
              Create Study
            </Button>
          </Link>
        </Tooltip>
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
