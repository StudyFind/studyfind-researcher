import React, { useState } from "react";
import styled from "styled-components";

import { Card } from "components";

import { getDefaultTab } from "./functions";

import Header from "views/External/Header";
import Footer from "views/External/Footer";

import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";
import AuthMessage from "./AuthMessage";

function Auth() {
  const [message, setMessage] = useState({
    type: "success",
    title: "Password Reset Email Sent!",
    text: "Check your email for a password reset link",
  });
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
      <Footer />
    </Box>
  );
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
