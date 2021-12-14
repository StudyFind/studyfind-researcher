import { useEffect, useRef, useState } from "react";
import { usePagination, usePathParams } from "hooks";
import { auth, firestore } from "database/firebase";
import { message } from "database/mutations";
import { Flex } from "@chakra-ui/react";

import { Grid } from "@chakra-ui/react";
import { Loader } from "components";

import MessageList from "components/feature/Participants/Messages/MessageList";
import MessageInput from "components/feature/Participants/Messages/MessageInput";
import FilesForm from "components/feature/Study/FilesEdit/FilesForm";

function Messages() {
  const { studyID, participantID } = usePathParams();
  const [isUploadView, setisUploadView] = useState(false);

  const bottomRef = useRef();

  const messagesQuery = firestore
    .collection("studies")
    .doc(studyID)
    .collection("participants")
    .doc(participantID)
    .collection("messages")
    .orderBy("time", "desc");

  const {
    documents: messages,
    loading,
    loadingMore,
    handleLoadMore,
    fetchedAll,
  } = usePagination(messagesQuery, 15);

  const scrollToBottom = () => {
    bottomRef?.current?.scrollIntoView();
  };

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [loading]);

  const handleMessageSend = (text, hasAttachment = false) => {
    return message
      .send(studyID, participantID, { text }, hasAttachment)
      .then(() => scrollToBottom());
  };

  const handleMessageRead = (messageID) => {
    return message.read(studyID, participantID, messageID);
  };

  const handleCancelUpload = () => {
    setisUploadView(false);
  };

  const handleOpenUploadView = () => {
    setisUploadView(true);
  };

  const handleFileUpload = (value) => {
    const msg = value.name + ".pdf";
    handleMessageSend(msg, true);
    setisUploadView(false);
  };

  if (loading) {
    return <Loader height="calc(100vh - 80px)" />;
  }

  return isUploadView ? (
    <Flex height="100%" justifyContent="center">
      <FilesForm
        handleSubmit={handleFileUpload}
        handleCancel={handleCancelUpload}
      />
    </Flex>
  ) : (
    <Grid height="100%" gridTemplateRows="1fr 49px">
      <MessageList
        uid={auth.currentUser.uid}
        messages={messages.slice().reverse()}
        fetchedAll={fetchedAll}
        loadingMore={loadingMore}
        handleLoadMore={handleLoadMore}
        handleMessageRead={handleMessageRead}
        bottomRef={bottomRef}
      />
      <MessageInput
        handleOpenUploadView={handleOpenUploadView}
        handleMessageSend={handleMessageSend}
      />
    </Grid>
  );
}

export default Messages;
