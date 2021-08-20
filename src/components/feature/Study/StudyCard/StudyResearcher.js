import { useColor } from "hooks";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { useDetectDevice } from "hooks";

function StudyResearcher({ researcher }) {
  const { isPhone } = useDetectDevice();

  const avatar = useColor("blue.500", "blue.700");
  const background = useColor("white", "gray.900");
  const borderColor = useColor("gray.200", "gray.700");

  return (
    <Box>
      <Flex
        rounded="md"
        gridGap="10px"
        align="flex-end"
        overflow="hidden"
        padding="12px"
        borderWidth="1px"
        borderColor={borderColor}
        background={background}
        width={isPhone && "100%"}
      >
        <Avatar
          name={researcher.name}
          color="white"
          background={avatar}
          width="42px"
          height="42px"
        />
        <Box>
          <Text color="white" fontSize="0.9rem" fontWeight="500" maxWidth="180px" isTruncated>
            {researcher.name}
          </Text>
          <Text fontSize="0.9rem" color="gray.400" isTruncated maxWidth="180px">
            {researcher.email}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default StudyResearcher;
