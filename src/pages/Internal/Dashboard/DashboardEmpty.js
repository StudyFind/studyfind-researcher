import { VStack, Box, Heading, Text } from "@chakra-ui/react";

import DashboardButton from "./DashboardButton";

function DashboardEmpty({ verified }) {
  return (
    <VStack height="100%" width="100%" align="flex-start">
      <Box width="500px">
        <Heading size="lg">Create your first study</Heading>
        <Text color="gray.500" marginTop="8px" marginBottom="30px">
          You can create a new study and begin recruiting and managing
          participants almost instantaneously. Follow the study creation steps
          carefully to yeild the best outcomes from StudyFind.
        </Text>
        <DashboardButton verified={verified} />
      </Box>
    </VStack>
  );
}

export default DashboardEmpty;
