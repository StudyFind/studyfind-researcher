import React from "react";
import { Flex } from "@chakra-ui/react";
import { Message } from "components";

function MeetingsError() {
  return (
    <Flex borderWidth="1px" p="40px 30px" m="20px 0" rounded="md" bg="white">
      <Message
        type="failure"
        title="Connection Error"
        description="We were unable to load your meetings. Please check your connection and try again."
      />
    </Flex>
  );
}

export default MeetingsError;
