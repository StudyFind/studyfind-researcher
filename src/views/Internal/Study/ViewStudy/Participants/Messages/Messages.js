import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

import { useParams } from "react-router-dom";
import { auth, firestore } from "database/firebase";

import { Box, Text, Flex, Button, Input } from "@chakra-ui/react";
import { Loader, Form } from "components";
import Disclaimer from "./Disclaimer";

import Message from "./Message";
import MessageInput from "./MessageInput";

function Messages({ participant }) {
  const dummyRef = useRef();
  const { nctID } = useParams();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const messagesRef = firestore
    .collection("studies")
    .doc(nctID)
    .collection("participants")
    .doc(participant.id)
    .collection("messages");

  useEffect(() => {
    messagesRef.orderBy("time", "desc").onSnapshot((snapshot) => {
      setMessages(() => {
        const list = [];
        snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
        return list.reverse();
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      dummyRef.current.scrollIntoView();
    }
  }, [loading]);

  if (loading) return <Loader />;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <>
      <Flex p="20px">
        <Disclaimer />
      </Flex>
      <Flex direction="column" overflowY="scroll" gridGap="8px" p="20px" pb="80px">
        {messages &&
          messages.map((message, i) => (
            <Message
              key={i}
              message={message}
              messagesRef={messagesRef}
              isUser={message.user === auth.currentUser.uid}
            />
          ))}
      </Flex>
      <Box ref={dummyRef} />
      <MessageInput participant={participant} dummyRef={dummyRef} />
    </>
  );
}

export default Messages;
