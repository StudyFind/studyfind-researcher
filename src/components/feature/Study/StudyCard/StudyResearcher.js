import { Box, Flex, Text, Avatar, useColorModeValue } from "@chakra-ui/react";
import { useDetectDevice } from "hooks";
import { useContext } from "react";

function StudyResearcher({ researcher }) {
  const avatar = useColorModeValue("blue.500", "blue.700");
  const background = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { isPhone } = useDetectDevice();

  return (
    <Flex
      gridGap="10px"
      align="flex-end"
      rounded="md"
      overflow="hidden"
      padding="12px"
      borderWidth="1px"
      borderColor={borderColor}
      background={background}
      width={isPhone && "100%"}
    >
      <Avatar color="white" background={avatar} name={researcher.name} />
      <Box>
        <Text isTruncated>{researcher.name}</Text>
        <Text isTruncated color="gray.500" maxWidth="80%">
          {researcher.email}
        </Text>
      </Box>
    </Flex>
  );
}

export default StudyResearcher;
