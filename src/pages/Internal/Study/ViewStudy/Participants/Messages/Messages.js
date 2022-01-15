import { useEffect, useRef } from "react";
import { usePagination, usePathParams } from "hooks";
import { auth, firestore } from "database/firebase";
import { message } from "database/mutations";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import SFLogo from "images/logo.png";

import { Grid } from "@chakra-ui/react";
import { Loader } from "components";

import MessageList from "components/feature/Participants/Messages/MessageList";
import MessageInput from "components/feature/Participants/Messages/MessageInput";

function Messages() {
  const { studyID, participantID } = usePathParams();

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

  const handleMessageSend = (text) => {
    return message
      .send(studyID, participantID, { text })
      .then(() => scrollToBottom());
  };

  const handleMessageRead = (messageID) => {
    return message.read(studyID, participantID, messageID);
  };

  const handleMessageExport = async () => {
    const saveByteArray = (reportName, byte) => {
      const blob = new Blob([byte], { type: "application/pdf" });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      const fileName = reportName;
      link.download = fileName;
      link.click();
    };
    const pdfDoc = await PDFDocument.create();
    const canvas = document.createElement("canvas");
    const logoUrl = canvas.toDataURL("images/logo.png");
    const logo = await pdfDoc.embedPng(logoUrl);
    const logoDims = logo.scale(0.5);
    const page = pdfDoc.addPage();
    // Wont draw....?????
    page.drawImage(logo, {
      x: page.getWidth() / 2 - logoDims.width / 2,
      y: page.getHeight() / 2 - logoDims.height / 2 + 250,
      width: logoDims.width,
      height: logoDims.height,
    });
    const { height } = page.getSize();
    let y = height / (messages.length * 2);
    const x = 25;
    messages.forEach((msg) => {
      const who = auth.currentUser.uid === msg.user ? "You: " : "Them: ";
      page.drawText(who + msg.text, {
        x: x,
        y: y,
        size: 10,
      });
      y = y + height / messages.length;
    });
    const pdfBytes = await pdfDoc.save();
    saveByteArray(studyID + "_Messages", pdfBytes);
  };

  if (loading) {
    return <Loader height="calc(100vh - 80px)" />;
  }

  return (
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
        handleMessageExport={handleMessageExport}
        handleMessageSend={handleMessageSend}
      />
    </Grid>
  );
}

export default Messages;
