import { Grid } from "@chakra-ui/react";
import { messages } from "data";

import MessageList from "components/feature/Messages/MessageList";
import MessageInput from "components/feature/Messages/MessageInput";

function Messages({ participant, study }) {
  const uid = "yohanjhaveri@gmail.com";
  const fetchedAll = false;
  const additionalLoading = false;

  const handleMessageSend = () => {};
  const handleMessageRead = () => {};
  const handleFetchAdditional = () => {};

  return (
    <Grid height="100%" gridTemplateRows="1fr 49px">
      <MessageList
        uid={uid}
        messages={messages}
        fetchedAll={fetchedAll}
        additionalLoading={additionalLoading}
        handleFetchAdditional={handleFetchAdditional}
        handleMessageRead={handleMessageRead}
      />
      <MessageInput handleMessageSend={handleMessageSend} />
    </Grid>
  );
}

export default Messages;
