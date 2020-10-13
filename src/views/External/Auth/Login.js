import React from "react";
import styled from "styled-components";

import { Input, Button } from "components";
import {
  AuthTab,
  Heading,
  AuthLink,
  Divider,
  Line,
  SocialButtons,
  FacebookButton,
  GoogleButton,
} from "./styles";

function Login({
  inputs,
  errors,
  loading,
  setTab,
  handleInputs,
  handleSignin,
}) {
  return (
    <AuthTab handleSubmit={handleSignin}>
      <Heading> Welcome Back </Heading>
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={inputs.email}
        error={errors.email}
        onChange={handleInputs}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={inputs.password}
        error={errors.password}
        onChange={handleInputs}
      />
      <Button onClick={handleSignin} loading={loading}>
        Login
      </Button>
      <Divider>
        <Line /> OR <Line />
      </Divider>
      <SocialButtons>
        <FacebookButton onClick={() => {}}>
          <i className="fa fa-facebook" /> Facebook
        </FacebookButton>
        <GoogleButton onClick={() => {}} color="danger">
          <i className="fa fa-google" /> Google
        </GoogleButton>
      </SocialButtons>
      <AuthLink onClick={() => setTab("forgot password")}>
        Forgot password?
      </AuthLink>
    </AuthTab>
  );
}

export default Login;
