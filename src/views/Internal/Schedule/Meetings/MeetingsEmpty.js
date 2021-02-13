import React from "react";
import { Flex } from "@chakra-ui/react";
import { Message } from "components";

function Empty() {
  return (
    <Flex borderWidth="1px" p="40px 30px" my="10px" rounded="md" bg="white">
      <Message title="No Meetings" description="You do not have any meetings on this day" />
    </Flex>
  );
}

export default Empty;
