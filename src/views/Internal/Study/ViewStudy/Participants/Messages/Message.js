import React, { useEffect } from "react";

import { auth, firestore } from "database/firebase";

import { Text, Box } from "@chakra-ui/react";

function Message({ message }) {
  // const handleRead = () => {
  //   if (auth.currentUser.uid !== message.user) {
  //     firestore
  //       .collection("studies")
  //       .doc(???)
  //       .collection("participants")
  //       .doc(???)
  //       .collection("messages")
  //       .doc(???)
  //       .update()
  //   }
  // }
  //
  // useEffect(() => {
  //   handleRead()
  // }, [])

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
