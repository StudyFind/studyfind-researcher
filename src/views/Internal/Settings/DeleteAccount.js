import React from "react";
import styled from "styled-components";

import { useAuthForm } from "hooks";
import { deleteUser } from "database";

import { Input, Form, Button, Card } from "components";

function DeleteAccount() {
  const { inputs, errors, loading, handleInput, handleSubmit } = useAuthForm({
    initial: { email: "", password: "" },
    onSubmit: deleteUser,
  });

  return (
    <AuthCard>
      <AuthForm onSubmit={() => handleSubmit(inputs.email, inputs.password)}>
        <Heading>Delete Account</Heading>

        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={inputs.email}
          error={errors.email}
          onChange={handleInput}
        />

        <Input
          name="password"
          type="password"
          placeholder="Old Password"
          value={inputs.password}
          error={errors.password}
          onChange={handleInput}
        />

        <Button color="danger" loading={loading}>
          Confirm Delete Account
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
  color: #de4437;
  text-align: center;
`;

export default DeleteAccount;
