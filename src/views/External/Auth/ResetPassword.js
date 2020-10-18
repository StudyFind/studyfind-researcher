import React from "react";

import AuthForm from "./AuthForm";
import { resetPassword } from "database";

function ResetPassword({ setTab, setMessage }) {
  const url = new URL(window.location.href);
  const actionCode = url.searchParams.get("oobCode");

  const handleSubmit = ({ password }) => resetPassword(actionCode, password);

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
      initial={{ password: "" }}
      button="Reset Password"
      setTab={setTab}
      redirect={{ prompt: "Return to login", tab: "login" }}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      onFailure={(error) => console.log(error)}
    ></AuthForm>
  );
}

export default ResetPassword;
