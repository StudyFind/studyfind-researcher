import React, { useState } from "react";
import styled from "styled-components";
import { Box, Flex } from "@chakra-ui/react";

import Login from "./Tabs/Login";
import Signup from "./Tabs/Signup";
import ForgotPassword from "./Tabs/ForgotPassword";
import ResetPassword from "./Tabs/ResetPassword";

function Auth() {
  const getDefaultTab = () => {
    const url = new URL(window.location.href);
    const mode = url.searchParams.get("mode");
    const accountExists = localStorage.getItem("exists") === "true";

    return mode || (accountExists ? "login" : "signup");
  };

  const [tab, setTab] = useState(getDefaultTab());

  const render = {
    login: <Login setTab={setTab} />,
    signup: <Signup setTab={setTab} />,
    forgotPassword: <ForgotPassword setTab={setTab} />,
    resetPassword: <ResetPassword setTab={setTab} />,
  };

  return (
    <Flex justify="center" align="center" h="100vh">
      <Box w="350px" bg="#f8f9fa" borderWidth="1px" borderColor="gray" rounded="md">
        <Flex borderBottom="1px solid #e7eaf3">
          <Tab selected={tab === "signup"} onClick={() => setTab("signup")}>
            Sign up
          </Tab>
          <Tab selected={tab === "login"} onClick={() => setTab("login")}>
            Login
          </Tab>
        </Flex>
        {render[tab]}
      </Box>
    </Flex>
  );
}

const Tab = styled.button`
  flex: 1;
  color: #96a0aa;
  text-align: center;
  padding: 1rem 0.75rem;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: -2px;
  outline: none;

  &:hover,
  &:focus,
  &:active {
    color: rgb(49, 130, 207);
  }

  ${(props) =>
    props.selected &&
    `
      color: rgb(49, 130, 207);
      border-bottom: 3px solid rgb(49, 130, 207);
  `}
`;

export default Auth;
