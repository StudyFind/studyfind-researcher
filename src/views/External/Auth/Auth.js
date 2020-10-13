import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  validate,
  signin,
  signup,
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "database";
import { Card } from "components";

import ResearcherImage from "images/research.jpg";

import Header from "views/External/Header";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Success from "./Success";

import { NavHashLink as HashLink } from "react-router-hash-link";

function Auth() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(
    "Check your email for a password reset link"
  );
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(
    localStorage.getItem("exists") === "true" ? "login" : "sign up"
  );

  useEffect(() => {
    setErrors({});
  }, [tab]);

  const handleInputs = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, [name]: !value });
  };

  const handleSignup = () => {
    const inputErrors = validate(inputs);
    const errorExists = Object.keys(inputErrors).some((v) => inputErrors[v]);

    if (errorExists) {
      setErrors(inputErrors);
      return;
    }

    setLoading(true);

    const { email, password } = inputs;

    signup(email, password)
      .then((user) => {
        setLoading(false);
        setSuccessMessage("Check your email for a verification link");
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err);
      });
  };

  const handleSignin = () => {
    const inputErrors = validate(inputs);
    const errorExists = Object.keys(inputErrors).some((v) => inputErrors[v]);

    if (errorExists) {
      setErrors(inputErrors);
      return;
    }

    setLoading(true);

    const { email, password } = inputs;

    signin(email, password)
      .then((user) => {
        // sign in user (redirect is automatic through onAuthStateChanged function in App.js)
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err);
      });
  };

  const handleForgotPassword = () => {
    setLoading(true);
    const { email } = inputs;
    sendPasswordResetEmail(email)
      .then(() => {
        setSuccessMessage("Check your email for a password reset link");
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err);
      });
  };

  return (
    <Page>
      <Header />
      <AuthBox>
        {successMessage ? (
          <Success
            setTab={setTab}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        ) : (
          <AuthCard
            current={tab}
            tabs={["sign up", "login"]}
            handleSelect={setTab}
          >
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
          </AuthCard>
        )}
      </AuthBox>
    </Page>
  );
}

const Logo = styled(HashLink)`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: 0 40px;
  align-items: center;
`;

const Icon = styled.img`
  height: 2.2rem;
`;

const Name = styled.h4`
  font-family: "Avenir", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
  margin-left: 10px;
  color: #323232;
`;

const AuthBox = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  width: 350px;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

const AuthCard = styled(Card)`
  width: 100%;
`;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Auth;
