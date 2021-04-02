import React, { useState, useEffect } from "react";

import { useCollection } from "hooks";
import { useParams } from "react-router-dom";
import { auth, firestore } from "database/firebase";

import { Text, Input, Flex, Button, Box, Grid } from "@chakra-ui/react";
import Message from "./Message";
import { Loader } from "components";

import messageData from "./messageData";

function Messages({ participant }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { nctID } = useParams();

  const handleFetchInitial = () => {
    setMessages(messageData);
  };

  // const handleFetchInitial = async () => {
  //   const MESSAGES_PER_REQUEST = 10;
  //   setLoading(true);

  //   try {
  //     const snapshot = await firestore
  //       .collection("studies")
  //       .doc(nctID)
  //       .collection("participants")
  //       .doc(participant.id)
  //       .collection("messages")
  //       .orderBy("time", "desc")
  //       .limit(MESSAGES_PER_REQUEST)
  //       .get();

  //     snapshot.forEach((doc) => {
  //       documents.push(doc);
  //       messages.push({ id: doc.id, ...doc.data() });
  //     });

  //     if (documents.length < MESSAGES_PER_REQUEST) {
  //       setFetchedAll(true);
  //     }
  //   } catch (e) {
  //     setError(e);
  //   }

  //   setLoading(false);
  // };

  const handleFetchAdditional = async () => {
    if (fetchedAll) return;
    const MESSAGES_PER_REQUEST = 10;
    const lastDoc = documents.length && messages.length ? documents[documents.length - 1] : "";
    setLoading(true);

    try {
      const snapshot = await firestore
        .collection("studies")
        .doc(nctID)
        .collection("participants")
        .doc(participant.id)
        .collection("messages")
        .orderBy("time", "desc")
        .startAfter(lastDoc)
        .limit(MESSAGES_PER_REQUEST)
        .get();

      const collections = [];
      const docs = [];

      snapshot.forEach((doc) => {
        docs.push(doc);
        collections.push({ id: doc.id, ...doc.data() });
      });

      setMessages((prev) => prev.concat(collections));
      setDocuments((prev) => prev.concat(docs));

      if (docs.length < MESSAGES_PER_REQUEST) {
        setFetchedAll(true);
      }
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  //not sure how to use useCollection with pagination
  // const [messages, loading, error] = useCollection(
  //   firestore
  //     .collection("studies")
  //     .doc(nctID)
  //     .collection("participants")
  //     .doc(participant.id)
  //     .collection("messages")
  //     .orderBy("time", "desc")
  //     .limit(MESSAGES_PER_REQUEST)
  // );

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    firestore
      .collection("studies")
      .doc(nctID)
      .collection("participants")
      .doc(participant.id)
      .collection("messages")
      .add({
        text: input,
        read: false,
        time: Math.floor(new Date().getTime() / 1000),
        user: auth.currentUser.uid,
      });
    setInput("");
  };

  useEffect(() => {
    handleFetchInitial();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <Box>
      <Box overflowY="scroll">
        <Flex
          direction="column"
          bg="white"
          rounded="md"
          roundedBottom="0"
          p="4px"
          h="92%"
          borderWidth="1px"
          borderBottomWidth="0"
          justifyContent="flex-end"
        >
          <Flex p="20px" justify="center">
            {fetchedAll ? (
              <Text color="gray.400">Showing all messages</Text>
            ) : (
              <Button
                size="sm"
                colorScheme="blue"
                textColor="white"
                isLoading={loading}
                loadingText="Loading..."
                onClick={handleFetchAdditional}
              >
                Load more
              </Button>
            )}
          </Flex>
          {messages &&
            messages.map((message, index) => <Message key={index} message={message} />).reverse()}
        </Flex>
      </Box>
      <Flex>
        <Input
          roundedBottomLeft="md"
          value={input}
          onChange={handleChange}
          placeholder="Type your message here"
          borderRadius="0"
          bg="whiteAlpha.900"
        />
        <Button
          roundedBottomRight="md"
          colorScheme="blue"
          borderRadius="0"
          onClick={() => handleSubmit()}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
}

export default Messages;
