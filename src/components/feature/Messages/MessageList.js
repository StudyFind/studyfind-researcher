import { Box, Grid, Flex, useColorModeValue } from "@chakra-ui/react";
import { Disclaimer, LoadMoreButton } from "components";

import Message from "./Message";

function MessageList({
  uid,
  messages,
  fetchedAll,
  handleMessageRead,
  handleFetchAdditional,
  additionalLoading,
}) {
  const messageListbackground = useColorModeValue("#f8f9fa", "gray.800");

  return (
    <Grid overflowY="scroll" background={messageListbackground}>
      <Flex
        justify="center"
        marginBottom="auto"
        width="100%"
        padding="20px"
        paddingBottom="0"
      >
        {fetchedAll ? (
          <Box maxWidth="330px">
            <Disclaimer>
              Messages are not end-to-end encrypted. Please avoid sharing
              personal health information through this chat.
            </Disclaimer>
          </Box>
        ) : (
          <LoadMoreButton
            onClick={handleFetchAdditional}
            isLoading={additionalLoading}
          >
            Load more
          </LoadMoreButton>
        )}
      </Flex>
      <Flex
        justify="flex-end"
        direction="column"
        padding="20px"
        gridGap="8px"
        width="100%"
      >
        {messages?.map((message) => (
          <Message
            key={message.id}
            message={message}
            handleMessageRead={handleMessageRead}
            isUserMessageSender={message.user === uid}
          />
        ))}
      </Flex>
    </Grid>
  );
}

export default MessageList;
