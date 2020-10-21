import React from "react";
import styled from "styled-components";

import { useAuthForm } from "hooks";
import { changePassword } from "database";

import { Input, Form, Button, Card, Message } from "components";

function ChangePassword() {
  const { inputs, errors, success, loading, handleInput, handleSubmit } = useAuthForm(
    changePassword
  );

  if (success) {
    return (
      <AuthCard>
        <Message type="success" title="Successfully Changed Password">
          You can now use your new password to log in
        </Message>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthForm handleSubmit={() => handleSubmit(inputs.password, inputs.newPassword)}>
        <Heading>Change Password</Heading>

        <Input
          name="password"
          type="password"
          placeholder="Old Password"
          value={inputs.password}
          error={errors.password}
          onChange={handleInput}
        />

        <Input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={inputs.newPassword}
          error={errors.newPassword}
          onChange={handleInput}
        />

        <Button onClick={() => handleSubmit(inputs.password, inputs.newPassword)} loading={loading}>
          Confirm Change Password
        </Button>
      </AuthForm>
    </AuthCard>
  );
}

const AuthCard = styled(Card)`
  width: 350px;
`;

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

export default ChangePassword;
