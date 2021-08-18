import { useColor } from "hooks";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useDetectDevice } from "hooks";

function TeamMember({ image, name, position, description }) {
  const { isPhone } = useDetectDevice();

  const textColor = useColor("gray.600", "gray.400");

  return (
    <Flex direction="column" align="center">
      <Box overflow="hidden" height="160px" width="160px" borderRadius="320px">
        <Image src={image} />
      </Box>
      <Text fontSize="18px" fontWeight="600" marginTop="16px">
        {name}
      </Text>
      <Text fontSize="16px" fontWeight="600" color="gray.500">
        {position}
      </Text>
      <Text
        fontSize="16px"
        textAlign="center"
        color={textColor}
        marginTop="8px"
        width={isPhone ? "80%" : "100%"}
        maxWidth="300px"
      >
        {description}
      </Text>
    </Flex>
  );
}

export default TeamMember;
