import React from "react";
import moment from "moment";

import { Text, Box, Flex } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

function Message({ message, isUser }) {
  return (
    <Box maxW="300px" alignSelf={isUser ? "flex-end" : "flex-start"}>
      <Text
        p="5px 10px"
        rounded="md"
        color={isUser ? "white" : "gray.700"}
        bg={isUser ? "blue.500" : "gray.200"}
      >
        {message.text}
      </Text>
      <Flex p="4px" align="center" gridGap="4px" justify={`flex-${isUser ? "end" : "start"}`}>
        {isUser && (
          <>
            <Text fontSize="xs" color="gray.500" fontWeight="500">
              {message.read ? "Read" : "Sent"}
            </Text>
            <Text fontSize="4px" color="gray.500" fontWeight="500">
              <FaCircle />
            </Text>
          </>
        )}
        <Text fontSize="xs" color="gray.500" fontWeight="500">
          {moment(message.time).fromNow()}
        </Text>
      </Flex>
    </Box>
  );
}

export default Message;
