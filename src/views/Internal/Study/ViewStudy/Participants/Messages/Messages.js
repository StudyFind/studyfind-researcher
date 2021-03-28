import React, { useState } from "react";

import { useCollection } from "hooks";
import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";

import { Box, Text, Grid, Flex, Badge, Radio, RadioGroup, Button } from "@chakra-ui/react";

import { Loader } from "components";

function Messages({ participant }) {
  const MESSAGES_PER_REQUEST = 10;
  const { nctID } = useParams();
  const [messages, loading, error] = useCollection(
    firestore
      .collection("studies")
      .doc(nctID)
      .collection("participants")
      .doc(participant.id)
      .collection("messages")
      .orderBy("time")
      .limit(MESSAGES_PER_REQUEST)
  );

  if (loading) return <Loader />;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>

  return (
    <Box>
      {messages && messages.map((message, index) => (
        <Box key={index}>
          <Text>text: {message.text}</Text>
          <Text>user: {message.user}</Text>
          <Text>time: {message.time}</Text>
          <Text>read: {message.read ? "tru" : "fal"}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default Messages;
