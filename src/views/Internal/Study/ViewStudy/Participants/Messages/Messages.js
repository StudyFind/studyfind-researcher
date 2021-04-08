import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

import { useParams } from "react-router-dom";
import { auth, firestore } from "database/firebase";

import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Input, Loader, Form } from "components";
import Disclaimer from "./Disclaimer";

import Message from "./Message";
import messageData from "./messageData";

function Messages({ participant }) {
  const dummy = useRef();
  const { nctID } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [sendLoading, setSendLoading] = useState(false);
  const [error, setError] = useState(null);

  const messagesRef = firestore
    .collection("studies")
    .doc(nctID)
    .collection("participants")
    .doc(participant.id)
    .collection("messages");

  // useEffect(() => {
  //   messagesRef.orderBy("time", "desc").onSnapshot((snapshot) => {
  //     setMessages(() => {
  //       const list = [];
  //       snapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
  //       return list;
  //     });
  //     setFetchLoading(false);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!fetchLoading) {
  //     dummy.current.scrollIntoView();
  //   }
  // }, [fetchLoading]);

  // useEffect(() => {
  //   if (!fetchLoading && !sendLoading) {
  //     dummy.current.scrollIntoView({ behaviour: "smooth" });
  //   }
  // }, [sendLoading]);

  // const handleChange = (_, value) => {
  //   setMessage(value);
  // };

  // const handleSubmit = () => {
  //   if (!message.trim()) {
  //     return;
  //   }

  //   const data = {
  //     text: message,
  //     read: false,
  //     time: moment().utc().valueOf(),
  //     user: auth.currentUser.uid,
  //   };

  //   setSendLoading(true);
  //   messagesRef.add(data).then(() => {
  //     setMessage("");
  //     setSendLoading(false);
  //   });
  // };

  // if (fetchLoading) return <Loader />;
  // if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <>
      <Flex direction="column" justify="flex-end" gridGap="10px" h="100%">
        <Form onSubmit={() => {}}>
          <Flex direction="column" overflowY="scroll">
            <Disclaimer />
            {messages &&
              messages.map((message, i) => (
                <Message
                  key={i}
                  message={message}
                  messagesRef={messagesRef}
                  isUser={message.user === auth.currentUser.uid}
                />
              ))}
            <Box ref={dummy} />
          </Flex>
          <Flex mt="10px">
            <Input
              placeholder="Type your message here..."
              bg="white"
              borderRightRadius="0"
              rightWidth="2rem"
              right={
                <Button colorScheme="blue" borderLeftRadius="0">
                  Send
                </Button>
              }
            />
          </Flex>
        </Form>
      </Flex>
    </>
  );
}

export default Messages;
