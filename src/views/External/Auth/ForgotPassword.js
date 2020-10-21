import React from "react";
import styled from "styled-components";

import { useAuthForm } from "hooks";
import { sendPasswordResetEmail } from "database";

import { Input, Form, Button, Message } from "components";

function ForgotPassword({ setTab }) {
  const { inputs, errors, success, loading, handleInput, handleSubmit } = useAuthForm({
    initial: { email: "" },
    onSubmit: sendPasswordResetEmail,
  });

  if (success) {
    return (
      <Message type="success" title="Email Sent!">
        Check your email for a password reset link
        <div>
          <Button onClick={() => setTab("login")}> Back to login </Button>
        </div>
      </Message>
    );
  }

  return (
    <AuthForm onSubmit={() => handleSubmit(inputs.email)}>
      <Heading>Forgot Password</Heading>

      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={inputs.email}
        error={errors.email}
        onChange={handleInput}
      />

      <Button loading={loading}>Request Password Reset Email</Button>

      <TabLink onClick={() => setTab("login")}>Return to login</TabLink>
    </AuthForm>
  );
}

const AuthForm = styled(Form)`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-gap: 15px;
`;

const Heading = styled.h2`
  color: #377dff;
  text-align: center;
`;

const TabLink = styled.a`
  all: unset;
  cursor: pointer;
  margin: auto;
  color: grey;
  font-size: 0.9rem;
  border-bottom: 1px dashed grey;

  &:hover {
    color: #377dff;
    border-color: #377dff;
    text-decoration: none;
  }
`;

export default ForgotPassword;
