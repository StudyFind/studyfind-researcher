import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { validate, signin, signup, googleAuth, sendPasswordResetEmail } from 'database';
import { Card } from 'components';

import ResearcherImage from 'images/research.jpg';

import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Success from './Success';

import { NavHashLink as HashLink } from 'react-router-hash-link';
import SFLogo from 'images/logo.png';

function Auth() {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('sign up');

  useEffect(() => {
    setErrors({});
  }, [tab]);

  const handleInputs = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, [name]: !value });
  }

  const handleEmailSignup = () => {
    const inputErrors = validate(inputs);
    const errorExists = Object.keys(inputErrors).some(v => inputErrors[v]);

    if(errorExists) {
      setErrors(inputErrors);
      return;
    }

    setLoading(true);

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

  const handleEmailSignin = () => {
    const inputErrors = validate(inputs);
    const errorExists = Object.keys(inputErrors).some(v => inputErrors[v]);

    if(errorExists) {
      setErrors(inputErrors);
      return;
    }

    setLoading(true);

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

  const handleGoogleAuth = () => {
    setLoading(true)
    googleAuth().then(resp => {
      console.log(resp)
    })
  }

  const handleFacebookAuth = () => {
    
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
      <Left>
        <Logo to="/#home">
          <Icon src={SFLogo} />
          <Name>StudyFind</Name>
        </Logo>
        <AuthBox>
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
                handleEmailSignin={handleEmailSignin}
                handleGoogleSignin={handleGoogleAuth}
                handleFacebookSignin={handleFacebookAuth}
              />
              <Signup
                tab="sign up"
                inputs={inputs}
                errors={errors}
                loading={loading}
                setTab={setTab}
                handleInputs={handleInputs}
                handleEmailSignup={handleEmailSignup}
                handleGoogleSignup={handleGoogleAuth}
                handleFacebookSignup={handleFacebookAuth}
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
        </AuthBox>
      </Left>
      <Image />
    </Page>
  )
}

// <h1 style={{ textAlign: 'right' }}>Participant Management</h1>
// <h2 style={{ textAlign: 'right' }}>From beginning to end</h2>

const Logo = styled(HashLink)`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 0 40px;
  align-items: center;
`

const Icon = styled.img`
  height: 2.2rem;
`

const Name = styled.h4`
  font-family: 'Avenir', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  margin-left: 10px;
  color: #323232;
`


const Image = styled.div`

  & > h1 {
    color: white;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 30px;
  width: 50vw;
  height: 100vh;
  background: linear-gradient(0deg, rgb(55, 125, 255, 0.75), rgb(55, 125, 255, 0.75)),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23377dff' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"),
              url(${ResearcherImage});

  background-position: center;

  // display: none;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const Left = styled.div`
  width: 50vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 100px 1fr;

  // width: 100vw;
  @media only screen and (max-width: 900px) {
    width: 100vw;
  }
`;

const AuthBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
`;

const Page = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default Auth;
