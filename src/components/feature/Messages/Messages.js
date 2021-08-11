import { Grid } from "@chakra-ui/react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function Messages({
  uid,
  messages,
  additionalLoading,
  fetchedAll,
  handleMessageRead,
  handleMessageSend,
  handleFetchAdditional,
}) {
  return (
    <Grid height="100%" gridTemplateRows="1fr 49px">
      <MessageList
        uid={uid}
        messages={messages}
        handleMessageRead={handleMessageRead}
        handleFetchAdditional={handleFetchAdditional}
        additionalLoading={additionalLoading}
        fetchedAll={fetchedAll}
      />
      <MessageInput handleMessageSend={handleMessageSend} />
    </Grid>
  );
}

export default Messages;
