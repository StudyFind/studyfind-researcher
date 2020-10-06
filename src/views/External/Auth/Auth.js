import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { validate, signin, signup, sendPasswordResetEmail } from 'database';
import { Card, Input, Button, Form, Message } from 'components';

function Auth() {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('sign up');

  useEffect(() => {
    setErrors({});
  }, [tab])

  const handleInputs = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, [name]: !value });
  }

  const handleSignup = () => {
    setLoading(true);

    const inputErrors = validate(inputs);
    const errorExists = Object.keys(inputErrors).some(v => inputErrors[v]);

    if(errorExists) {
      setErrors(inputErrors);
      setLoading(false);
      return;
    }

    const { email, password } = inputs;

    signup(email, password)
    .then(user => {
      setLoading(false);
      setSuccessMessage('Check your email for a verification link');
    })
    .catch(err => {
      setLoading(false);
      setErrors(err);
    });
  }

  const handleSignin = () => {
    setLoading(true);

    const inputErrors = validate(inputs);
    const errorExists = Object.keys(inputErrors).some(v => inputErrors[v]);

    if(errorExists) {
      setErrors(inputErrors);
      setLoading(false);
      return;
    }

    const { email, password } = inputs;

    signin(email, password)
    .then(user => {
      // sign in user (redirect is automatic through onAuthStateChanged function in App.js)
    })
    .catch(err => {
      setLoading(false);
      setErrors(err);
    });
  }

  const handleForgotPassword = () => {
    setLoading(true);
    const { email } = inputs;
    sendPasswordResetEmail(email)
    .then(() => {
      setSuccessMessage('Check your email for a password reset link');
    })
    .catch(err => {
      setErrors(err);
    });
  }

  return !successMessage ? (
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
          <Button onClick={() => handleSignup()} loading={loading}> Sign up </Button>
          <AuthLink onClick={() => setTab('login')}> Have an account? </AuthLink>
        </AuthTab>
        <AuthTab tab="login" handleSubmit={() => handleSignin()}>
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
          <Button onClick={() => handleSignin()} loading={loading}> Login </Button>
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
          { successMessage }
        </Message>
      </Success>
    </Page>
  );
}

const Success = styled(Card)`
  padding: 2rem;
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

const AuthLink = styled.a`
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
