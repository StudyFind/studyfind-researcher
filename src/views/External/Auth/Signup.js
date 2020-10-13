import React from "react";

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

function Signup({
  inputs,
  errors,
  loading,
  setTab,
  handleInputs,
  handleSignup,
}) {
  return (
    <AuthTab handleSubmit={() => handleSignup()}>
      <Heading> Create Account </Heading>
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
      <Button onClick={() => handleSignup()} loading={loading}>
        Sign up
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
      <AuthLink onClick={() => setTab("login")}> Have an account? </AuthLink>
    </AuthTab>
  );
}

export default Signup;
