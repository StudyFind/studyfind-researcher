import React from "react";
import styled from "styled-components";

import AuthForm from "./AuthForm";
import { signup } from "database";

function Signup({ setTab, setMessage }) {
  const handleSubmit = ({ email, password }) => signup(email, password);

  const handleSuccess = () => {
    setMessage({
      type: "success",
      title: "Success!",
      text: "Check your email for a verification link",
    });
  };

  return (
    <AuthForm
      heading="Create Account"
      initial={{ email: "", password: "" }}
      button="Sign up"
      social
      setTab={setTab}
      redirect={{ prompt: "Have an account?", tab: "login" }}
      onSubmit={handleSubmit}
      onSuccess={handleSuccess}
      onFailure={() => console.log("failure")}
    ></AuthForm>
  );
}

export default Signup;
