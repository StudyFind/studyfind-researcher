import React from "react";
import styled from "styled-components";

import AuthForm from "./AuthForm";
import { sendPasswordResetEmail } from "database";

function Signup({ setTab, setMessage }) {
  const handleSubmit = ({ email }) => sendPasswordResetEmail(email);

  const handleSuccess = () => {
    setMessage({
      type: "success",
      title: "Success!",
      text: "Check your email for a password reset link",
    });
  };

  return (
    <AuthForm
      heading="Forgot Password"
      initial={{ email: "" }}
      button="Send password reset email"
      setTab={setTab}
      redirect={{ prompt: "Back to login?", tab: "login" }}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      onFailure={() => console.log("failure")}
    ></AuthForm>
  );
}

export default Signup;
