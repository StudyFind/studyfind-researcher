import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import Tabs from "./Tabs";
import Form from "./Form";

function Auth() {
  const [tab, setTab] = useState(() => {
    const accountExists = localStorage.getItem("exists") === "true";
    return accountExists ? "login" : "signup";
  });

  return (
    <Flex justify="center" align="center" h="100vh">
      <Box rounded="md" borderWidth="1px" w="350px" bg="#f8f9fa">
        <Tabs tab={tab} setTab={setTab} />
        <Form tab={tab} setTab={setTab} />
      </Box>
    </Flex>
  );
}

export default Auth;
