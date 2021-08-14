import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import DashboardButton from "./DashboardButton";

function DashboardEmpty({ verified }) {
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
    </Flex>
  );
}

export default DashboardEmpty;
