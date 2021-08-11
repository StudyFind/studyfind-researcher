import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

function StudyBullet({ icon, value }) {
  const iconColor = useColorModeValue("blue.500", "blue.600");
  const textColor = useColorModeValue("black", "gray.200");

  return (
    <Flex align="center" gridGap="10px">
      <Box as={icon} color={iconColor} size="16px" />
      <Text color={textColor} fontWeight="500" fontSize="sm">
        {value}
      </Text>
    </Flex>
  );
}

export default StudyBullet;
