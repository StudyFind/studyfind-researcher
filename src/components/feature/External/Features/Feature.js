import { Box, Stack, Text } from "@chakra-ui/react";

function Feature({ title, children, icon }) {
  return (
    <Stack
      spacing={{ base: "3", md: "6" }}
      direction={{ base: "column", md: "row" }}
    >
      <Box fontSize="6xl">{icon}</Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
        </Text>
        <Box color="gray.500">{children}</Box>
      </Stack>
    </Stack>
  );
}

export default Feature;
