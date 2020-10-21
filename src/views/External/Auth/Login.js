import React from "react";
import styled from "styled-components";

import { useAuthForm } from "hooks";
import { signin } from "database";

import { Input, Form, Button } from "components";

function Login({ setTab }) {
  const { inputs, errors, loading, handleInput, handleSubmit } = useAuthForm({
    initial: { email: "", password: "" },
    onSubmit: signin,
  });

  return (
    <AuthForm onSubmit={() => handleSubmit(inputs.email, inputs.password)}>
      <Heading>Welcome Back</Heading>

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
        placeholder="Password"
        value={inputs.password}
        error={errors.password}
        onChange={handleInput}
      />

      <Button loading={loading}>Login</Button>

      <TabLink onClick={() => setTab("forgot password")}>Forgot Password?</TabLink>
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

export default Login;
