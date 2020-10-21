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
import { AuthMessage } from "blocks";

function Auth() {
  const [tab, setTab] = useState(getDefaultTab());
  const [message, setMessage] = useState();

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
      <Footer />
    </Box>
  );
}

function getDefaultTab() {
  const modes = {
    verifyEmail: "verify email",
    resetPassword: "reset password",
  };

  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  const accountExists = localStorage.getItem("exists") === "true";

  return modes[mode] || (accountExists ? "login" : "sign up");
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const AuthBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  height: 100%;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const AuthCard = styled(Card)`
  width: 350px;
`;

export default Auth;
