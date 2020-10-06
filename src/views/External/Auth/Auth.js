import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { signin, signup, sendPasswordResetEmail } from 'database';
import { Card, Input, Button, Form, Message } from 'components';

function Auth() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('sign up');

  const handleInputs = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: !value });
  }

  const handleSignup = () => {
    setLoading(true);
    const { email, password } = inputs;

    signup(email, password)
    .then(user => {
      setLoading(false);
      // tell user to expect a verification email
    })
    .catch(err => {
      setLoading(false);
      setErrors(err);
    })
  }

  const handleSignin = () => {
    setLoading(true);
    const { email, password } = inputs;

    signin(email, password)
    .then(user => {
      setLoading(false);
      // sign in user (redirect is automatic through onAuthStateChanged function in App.js)
    })
    .catch(err => {
      setLoading(false);
      setErrors(err);
    })
  }

  const handleForgotPassword = () => {
    setLoading(true);
    const { email } = inputs;
    sendPasswordResetEmail(email)
    .then(() => {
      // tell user that the email has been successfully sent
    })
    .catch(err => {

    })
  }

  return true ? (
    <Page>
      <Card current={tab} tabs={["sign up", "login"]} handleSelect={setTab}>
        <AuthTab tab="sign up" handleSubmit={() => handleSignup()}>
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
          <Button onClick={() => handleSignup()}> Sign up </Button>
          <AuthLink onClick={() => setTab('login')}> Have an account? </AuthLink>
        </AuthTab>
        <AuthTab tab="login">
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
          <Button onClick={() => handleSignin()}> Login </Button>
          <AuthLink onClick={() => setTab('forgot password')}> Forgot password? </AuthLink>
        </AuthTab>
        <AuthTab tab="forgot password">
          <Heading> Forgot Password </Heading>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={inputs.email}
            error={errors.email}
            onChange={handleInputs}
          />
          <Button onClick={() => handleForgotPassword()}> Send Password Reset Email </Button>
          <AuthLink onClick={() => setTab('login')}> Return to login </AuthLink>
        </AuthTab>
      </Card>
    </Page>
  ) : (
    <Page>
      <Success>
        <Message icon="check" type="success" title="Success!">
          Check your email for a verification link
        </Message>
      </Success>
    </Page>
  );
}

const Success = styled(Card)`
  padding: 2.5rem;
  width: 330px;
`;

const Heading = styled.h2`
  color: #377dff;
  text-align: center;
`;

const Page = styled.div`
  width: 100vw;
  height: calc(100vh - 78px);
  padding-top: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthLink = styled(Link)`
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

const AuthTab = styled(Form)`
  width: 330px;
  padding: 10px;
  display: grid;
  grid-gap: 15px;
`;


export default Auth;
