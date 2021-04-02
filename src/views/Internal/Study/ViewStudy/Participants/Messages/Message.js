import React, { useEffect } from "react";

import { auth, firestore } from "database/firebase";

import { Text, Box, Flex } from "@chakra-ui/react";

function makeDateText(date) {
  const seconds = Date.now()
  const curDate = new Date(seconds)

  const yesterday = new Date (curDate)
  yesterday.setDate(yesterday.getDate()-1)
  yesterday.setHours(0)
  yesterday.setMinutes(0)
  yesterday.setSeconds(0)

  const timeDiff = curDate.getTime() - date.getTime()

  if (timeDiff > 172800000) {
    return (new Intl.DateTimeFormat('en-US').format(date))
  } else if (curDate.getDate() != date.getDate() && date.getTime() > yesterday.getTime()) {
    return "Yesterday"
  } else if (curDate.getDate() === date.getDate()) {
    return (new Intl.DateTimeFormat('en-US', {timeStyle: "short"}).format(date))
  } else {return (new Intl.DateTimeFormat('en-US').format(date))}
}

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

  const isUser = auth.currentUser.uid === message.user

  return (
    <Box>
      <Box
        w="fit-content"
        ml={isUser ? "auto":0}
        mr={isUser ? 0:"auto"}
        mt="auto">
        <Flex>
          <Text 
            p="5px 9px"
            rounded = "md"
            maxW="280px"
            color={isUser ? "black" : "black"}
            bg={isUser ? "blue.100" : "gray.100"}>
            {message.text}
          </Text>
          <Text fontSize="xs" m="auto 0" p="0 4px"
          order={isUser ? 1:-1}
          width="70px">
            {makeDateText(new Date(message.time * 1000))}
          </Text>
        </Flex>
        <Text 
        w="30px"
        pb = "7px"
        fontSize="xs"
        ml={isUser ? "3px":"auto"}
        mr={isUser ? "auto":"3px"}>
          {message.read ? "Read" : "Sent"}
        </Text>
      </Box>
    </Box>
  );
}

export default Message;
