import React, { useRef } from "react";

import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function Messages({ participant }) {
  const dummy = useRef();
  const { nctID } = useParams();
  const messagesRef = firestore
    .collection("studies")
    .doc(nctID)
    .collection("participants")
    .doc(participant.id)
    .collection("messages");

  const autoscroll = () => {
    dummy.current && dummy.current.scrollIntoView();
  };

  return (
    <>
      <MessageList ref={dummy} autoscroll={autoscroll} messagesRef={messagesRef} />
      <MessageInput autoscroll={autoscroll} messagesRef={messagesRef} />
    </>
  );
}

export default Messages;
