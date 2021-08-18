import { useColor } from "hooks";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { useDetectDevice } from "hooks";

function StudyResearcher({ researcher }) {
  const avatar = useColor("blue.500", "blue.700");
  const background = useColor("white", "gray.900");
  const borderColor = useColor("gray.200", "gray.700");

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
        <Text isTruncated color="gray.500">
          {researcher.email}
        </Text>
      </Box>
    </Flex>
  );
}

export default StudyResearcher;
