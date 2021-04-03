import React from "react";
import { Box, Flex } from "@chakra-ui/react";

function Disclaimer() {
  return (
    <Flex justify="center" mb="auto">
      <Box
        color="yellow.600"
        bg="yellow.100"
        p="5px 10px"
        rounded="md"
        fontSize="xs"
        fontWeight="500"
        w="60%"
      >
        Messages are currently not end-to-end encrypted. Please avoid sharing personal health
        information through this chat.
      </Box>
    </Flex>
  );
}

export default Disclaimer;
