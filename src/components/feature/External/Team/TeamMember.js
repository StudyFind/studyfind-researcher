import { Box, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import MediaContext from "context/MediaContext";

function TeamMember({ image, name, position, description }) {
  const { isPhone } = useContext(MediaContext);

  const textColor = useColorModeValue("gray.600", "gray.400");

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
