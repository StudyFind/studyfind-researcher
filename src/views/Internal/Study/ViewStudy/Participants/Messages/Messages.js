import React, { useState, useEffect, useRef } from "react";

import { auth } from "database/firebase";
import { Text, Input, Flex, Button, Box } from "@chakra-ui/react";
import { Loader } from "components";

import Disclaimer from "./Disclaimer";
import Message from "./Message";
import messageData from "./messageData";

function Messages() {
  const dummy = useRef();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = () => {
    setLoading(true);
    setTimeout(() => {
      setMessages(messageData);
      setLoading(false);
      dummy.current.scrollIntoView();
    }, 500);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleChange = (name, value) => {
    setInput(value);
  };

  const handleSubmit = () => {
    // send message
  };

  if (loading) return <Loader />;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <Flex direction="column" justify="flex-end" gridGap="10px" p="25px" h="100%">
      <Flex direction="column" overflowY="scroll">
        <Disclaimer />
        {messages &&
          messages.map((message, i) => (
            <Message key={i} message={message} isUser={message.user === auth.currentUser.uid} />
          ))}
        <Box ref={dummy} />
      </Flex>
      <Flex mt="10px">
        <Input placeholder="Type your message here..." bg="white" borderRightRadius="0" />
        <Button colorScheme="blue" borderLeftRadius="0">
          Send
        </Button>
      </Flex>
    </Flex>
  );
}

export default Messages;
