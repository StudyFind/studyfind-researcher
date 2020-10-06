import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { validate, signin, signup, sendPasswordResetEmail } from 'database';
import { Card } from 'components';

import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Success from './Success';

function Auth() {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState();
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



  return (
    <Page>
      {
        successMessage
        ? <Success setTab={setTab} successMessage={successMessage} setSuccessMessage={setSuccessMessage} />
        : <Card current={tab} tabs={["sign up", "login"]} handleSelect={setTab}>
            <Login
              tab="login"
              inputs={inputs}
              errors={errors}
              loading={loading}
              setTab={setTab}
              handleInputs={handleInputs}
              handleSignin={handleSignin}
            />
            <Signup
              tab="sign up"
              inputs={inputs}
              errors={errors}
              loading={loading}
              setTab={setTab}
              handleInputs={handleInputs}
              handleSignup={handleSignup}
            />
            <ForgotPassword
              tab="forgot password"
              inputs={inputs}
              errors={errors}
              loading={loading}
              setTab={setTab}
              handleInputs={handleInputs}
              handleForgotPassword={handleForgotPassword}
            />
          </Card>
      }
    </Page>
  )
}

const Page = styled.div`
  width: 100vw;
  height: calc(100vh - 78px);
  padding-top: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default Auth;
