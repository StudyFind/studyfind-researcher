import React from "react";
import styled from "styled-components";

import AuthForm from "./AuthForm";
import { resetPassword } from "database";

function ResetPassword({ setTab, setMessage }) {
  const url = new URL(window.location.href);
  const actionCode = url.searchParams.get("oobCode");

  const handleSubmit = ({ newPassword }) => resetPassword(actionCode, newPassword);

  const handleSuccess = () => {
    setMessage({
      type: "success",
      title: "Success!",
      text: "Your password has been reset!",
    });
  };

  return (
    <AuthForm
      heading="Reset Password"
      initial={{ newPassword: "" }}
      button="Reset Password"
      setTab={setTab}
      redirect={{ prompt: "Return to login", tab: "login" }}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      onFailure={() => console.log("failure")}
    ></AuthForm>
  );
}

export default ResetPassword;
