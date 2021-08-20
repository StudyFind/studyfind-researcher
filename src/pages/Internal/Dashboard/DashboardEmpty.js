import { VStack, Box, Heading, Text } from "@chakra-ui/react";

import DashboardButton from "./DashboardButton";

function DashboardEmpty({ verified }) {
  return (
    <VStack height="100%" width="100%" align="flex-start">
      <Box width="500px">
        <Heading size="lg">Create your first study</Heading>
        <Text color="gray.500" marginTop="8px" marginBottom="30px">
          You can add your study using its Clinical Trials ID and begin recruiting and managing
          participants almost instantaneously. StudyFind automates a lot of your work for you.
        </Text>
        <DashboardButton verified={verified} />
      </Box>
    </VStack>
  );
}

export default DashboardEmpty;
