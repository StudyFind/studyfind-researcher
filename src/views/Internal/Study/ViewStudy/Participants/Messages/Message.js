import React, { useEffect } from "react";
import moment from "moment";

import { auth } from "database/firebase";

import { Flex, Text, Box } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

function Message({ message, messagesRef, isUser }) {
  useEffect(() => {
    if (!isUser) {
      messagesRef.doc(message.id).update({ read: true });
    }
  }, []);

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
