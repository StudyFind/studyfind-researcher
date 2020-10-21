import React from "react";

import { AuthForm } from "blocks";
import { signup } from "database";

function Signup({ setTab, setMessage }) {
  const handleSubmit = ({ email, password }) => signup(email, password);

  const handleSuccess = () => {
    setMessage({
      type: "success",
      title: "Account Created!",
      text: "Check your email for a verification link",
    });
  };

  const handleFailure = (error) => {
    console.log(error);
  };

  return (
    <AuthForm
      heading="Create Account"
      initial={{ email: "", password: "" }}
      button="Sign up"
      setTab={setTab}
      redirect={{ prompt: "Have an account?", tab: "login" }}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
    ></AuthForm>
  );
}

export default Signup;
