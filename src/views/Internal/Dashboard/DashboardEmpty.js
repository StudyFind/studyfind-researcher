import React from "react";

import { Link } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

function DashboardEmpty() {
  return (
    <Box w="450px">
      <Heading fontSize="32px">Create your first study</Heading>
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
  );
}

export default DashboardEmpty;
