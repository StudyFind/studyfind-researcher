import React from "react";

import { auth } from "database/firebase";

import { Text, Box } from "@chakra-ui/react";

function Message({ message }) {
  return (
    <Box>
      <Text
        color={auth.currentUser.uid === message.user ? "white" : "black"}
        bg={auth.currentUser.uid === message.user ? "blue.500" : "gray.200"}>
        {message.text}
      </Text>
      <Text>{new Date(1000 * message.time).toString()}</Text>
      <Text>{message.read ? "Read" : "Sent"}</Text>
    </Box>
  );
}

export default Message;
