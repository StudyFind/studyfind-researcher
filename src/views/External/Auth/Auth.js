import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import Tabs from "./Tabs";
import Form from "./Form";

function Auth() {
  const exists = localStorage.getItem("exists");
  const defaultTab = exists === "true" ? "login" : "signup";
  const [tab, setTab] = useState(defaultTab);

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
