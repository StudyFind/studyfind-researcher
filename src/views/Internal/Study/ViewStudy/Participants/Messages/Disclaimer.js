import React from "react";
import { Text, Flex, Icon } from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";

function Disclaimer() {
  return (
    <Flex justify="center" mb="auto">
      <Text
        color="red.500"
        bg="red.100"
        p="10px 15px"
        rounded="md"
        fontSize="sm"
        fontWeight="500"
        w="70%"
        textAlign="center"
      >
        <Icon as={FaExclamationCircle} mr="5px" mb="3px" fontSize="12px" />
        Messages are not end-to-end encrypted. Please avoid sharing personal health information
        through this chat.
      </Text>
    </Flex>
  );
}

export default Disclaimer;
