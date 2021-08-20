import { Box, Heading, Text } from "@chakra-ui/react";

function CreateStudyWrapper({ title, description, children }) {
  return (
    <Box paddingY="10px">
      <Heading>{title}</Heading>
      <Text color="gray.500" paddingTop="5px" paddingBottom="10px">
        {description}
      </Text>
      {children}
    </Box>
  );
}

export default CreateStudyWrapper;
