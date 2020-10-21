import React from "react";
import styled from "styled-components";

import { useAuthForm } from "hooks";
import { resetPassword } from "database";

import { Input, Form, Button, Message } from "components";

function ResetPassword({ setTab }) {
  const url = new URL(window.location.href);
  const actionCode = url.searchParams.get("oobCode");

  const { inputs, errors, success, loading, handleInput, handleSubmit } = useAuthForm({
    initial: { password: "" },
    onSubmit: resetPassword,
  });

  if (success) {
    return (
      <Message type="success" title="Password Reset!">
        You can now use your new password to log in
        <div>
          <Button onClick={() => setTab("login")}> Back to login </Button>
        </div>
      </Message>
    );
  }

  return (
    <AuthForm onSubmit={() => handleSubmit(actionCode, inputs.password)}>
      <Heading>Reset Password</Heading>

      <Input
        name="password"
        type="password"
        placeholder="New Password"
        value={inputs.password}
        error={errors.password}
        onChange={handleInput}
      />

      <Button loading={loading}>Confirm Reset Password</Button>

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

export default ResetPassword;
