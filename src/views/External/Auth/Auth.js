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

function Auth() {
  const getDefaultTab = () => {
    const modes = {
      verifyEmail: "verify email",
      resetPassword: "reset password",
    };

    const url = new URL(window.location.href);
    const mode = url.searchParams.get("mode");
    const accountExists = localStorage.getItem("exists") === "true";

    return modes[mode] || (accountExists ? "login" : "sign up");
  };

  const [tab, setTab] = useState(getDefaultTab());
  const tabs = ["sign up", "login"];

  return (
    <Box>
      <Header />
      <AuthBox>
        <AuthCard current={tab} tabs={tabs} hideTabs={!tabs.includes(tab)} handleSelect={setTab}>
          <Login tab="login" setTab={setTab} />
          <Signup tab="sign up" setTab={setTab} />
          <ForgotPassword tab="forgot password" setTab={setTab} />
          <ResetPassword tab="reset password" setTab={setTab} />
          <VerifyEmail tab="verify email" setTab={setTab} />
        </AuthCard>
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
