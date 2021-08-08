import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import DashboardButton from "./DashboardButton";

function DashboardEmpty({ verified }) {
  return (
    <Flex h="100%" direction="column">
      <Box w="500px">
        <Heading size="lg">Create your first study</Heading>
        <Text color="gray.500" mt="8px" mb="30px">
          You have the option to use your Clinical Trials ID to fetch your study details and add it
          to StudyFind to begin recruiting and managing participants almost instantaneously.
        </Text>
        <DashboardButton verified={verified} />
      </Box>
    </Flex>
  );
}

export default DashboardEmpty;
