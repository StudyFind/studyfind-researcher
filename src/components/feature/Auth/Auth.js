import { useContext, useState } from "react";

import { Box, useColorModeValue } from "@chakra-ui/react";

import AuthTabs from "./AuthTabs";
import AuthForm from "./AuthForm";
import AuthContext from "context/AuthContext";
import { useDetectDevice } from "hooks";

function Auth({ handleLogin, handleSignup, handleForgotPassword }) {
  const exists = localStorage.getItem("exists");
  const defaultTab = exists === "true" ? "login" : "signup";
  const [tab, setTab] = useState(defaultTab);

  const background = useColorModeValue("#f8f9fa", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { isPhone } = useDetectDevice();

  return (
    <AuthContext.Provider value={{ handleLogin, handleSignup, handleForgotPassword }}>
      <Box
        rounded="md"
        width={isPhone ? "100%" : "350px"}
        borderWidth="1px"
        borderColor={borderColor}
        background={background}
      >
        <AuthTabs tab={tab} setTab={setTab} />
        <AuthForm tab={tab} setTab={setTab} />
      </Box>
    </AuthContext.Provider>
  );
}

export default Auth;
