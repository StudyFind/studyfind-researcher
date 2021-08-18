import { useState } from "react";
import { useColor, useDetectDevice } from "hooks";

import { Box, Flex } from "@chakra-ui/react";

import AuthTabs from "./AuthTabs";
import AuthForm from "./AuthForm";
import AuthContext from "context/AuthContext";

function Auth({ handleLogin, handleSignup, handleForgotPassword }) {
  const exists = localStorage.getItem("exists");
  const defaultTab = exists === "true" ? "login" : "signup";
  const [tab, setTab] = useState(defaultTab);

  const { isPhone } = useDetectDevice();

  const background = useColor("#f8f9fa", "gray.800");
  const borderColor = useColor("gray.200", "gray.700");

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleSignup, handleForgotPassword }}
    >
      <Flex justify="center" align="center" width="100vw" height="100vh">
        <Box
          width={isPhone ? "80%" : "350px"}
          rounded="md"
          borderWidth="1px"
          borderColor={borderColor}
          background={background}
        >
          <AuthTabs tab={tab} setTab={setTab} />
          <AuthForm tab={tab} setTab={setTab} />
        </Box>
      </Flex>
    </AuthContext.Provider>
  );
}

export default Auth;
