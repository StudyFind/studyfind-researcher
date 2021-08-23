import { Grid } from "@chakra-ui/react";

import MessageList from "components/feature/Messages/MessageList";
import MessageInput from "components/feature/Messages/MessageInput";

function Messages({ participant, study }) {
  const uid = "yohanjhaveri@gmail.com";
  const fetchedAll = false;
  const loadingMore = false;

  const handleMessageSend = () => {};
  const handleMessageRead = () => {};
  const handleLoadMore = () => {};

  return (
    <Grid height="100%" gridTemplateRows="1fr 49px">
      <MessageList
        uid={uid}
        messages={[]}
        fetchedAll={fetchedAll}
        loadingMore={loadingMore}
        handleLoadMore={handleLoadMore}
        handleMessageRead={handleMessageRead}
      />
      <MessageInput handleMessageSend={handleMessageSend} />
    </Grid>
  );
}

export default Messages;
