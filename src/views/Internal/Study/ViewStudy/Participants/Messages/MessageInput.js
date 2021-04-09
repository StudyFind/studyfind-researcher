import React, { useState } from "react";
import moment from "moment";

import { useParams } from "react-router-dom";
import { auth, firestore } from "database/firebase";

import { Flex, Button, Input } from "@chakra-ui/react";
import { Form } from "components";

function MessageInput({ participant, dummyRef }) {
  const { nctID } = useParams();
  const [message, setMessage] = useState("");

  const messagesRef = firestore
    .collection("studies")
    .doc(nctID)
    .collection("participants")
    .doc(participant.id)
    .collection("messages");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (!message.trim()) {
      return;
    }

    const data = {
      text: message,
      read: false,
      time: moment().utc().valueOf(),
      user: auth.currentUser.uid,
    };

    setMessage("");
    messagesRef.add(data).then(() => {
      dummyRef.current.scrollIntoView();
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Flex position="fixed" bottom="0" width="100%" p="20px" pt="0px" bg="#f8f9fa">
        <Input
          value={message}
          onChange={handleChange}
          placeholder="Type your message here..."
          borderRightRadius="0px"
          bg="white"
        />
        <Button variant="outline" color="gray.500" borderLeftRadius="0" borderLeft="none">
          Send
        </Button>
      </Flex>
    </Form>
  );
}

export default MessageInput;
