import React, { useState } from "react";
import styled from "styled-components";

import { Card } from "components";

import Header from "views/External/Header";
import Footer from "views/External/Footer";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";
import AuthMessage from "./AuthMessage";

function getDefaultTab() {
  const modes = {
    verifyEmail: "verify email",
    resetPassword: "reset password",
  };

  if (Object.keys(modes).includes(mode)) {
    const url = new URL(window.location.href);
    const mode = url.searchParams.get("mode");
    return modes[mode];
  } else {
    const accountExists = localStorage.getItem("exists") === "true";
    return accountExists ? "login" : "sign up";
  }
}

function Auth() {
  const [message, setMessage] = useState();
  const [tab, setTab] = useState(getDefaultTab());

  return (
    <Box>
      <Header />
      <AuthBox>
        {message ? (
          <AuthMessage
            type={message.type}
            title={message.title}
            message={message.text}
            setTab={setTab}
            setMessage={setMessage}
          />
        ) : (
          <AuthCard current={tab} tabs={["sign up", "login"]} handleSelect={setTab}>
            <Login tab="login" setTab={setTab} setMessage={setMessage} />
            <Signup tab="sign up" setTab={setTab} setMessage={setMessage} />
            <ForgotPassword tab="forgot password" setTab={setTab} setMessage={setMessage} />
            <ResetPassword tab="reset password" setTab={setTab} setMessage={setMessage} />
            <VerifyEmail tab="verify email" setTab={setTab} setMessage={setMessage} />
          </AuthCard>
        )}
      </AuthBox>
    </Box>
  );
}

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const AuthBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 54px;
  height: 100%;
  width: 350px;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const AuthCard = styled(Card)`
  width: 100%;
`;

export default Auth;
