import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  validate,
  signin,
  signup,
  sendPasswordResetEmail,
  sendVerificationEmail,
  resetPassword,
  verifyUser,
} from "database";
import { Card } from "components";

import Header from "views/External/Header";
import Footer from "views/External/Footer";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import AuthMessage from "./AuthMessage";

import { useHistory } from "react-router-dom";
import { NavHashLink as HashLink } from "react-router-hash-link";

function getDefaultTab(url) {
  const mode = url.searchParams.get("mode");
  const modeValues = ["verifyEmail", "resetPassword"];
  const accountExists = localStorage.getItem("exists") === "true";

  const modeToTabs = {
    verifyEmail: "verify email",
    resetPassword: "reset password",
  };

  return modeValues.includes(mode)
    ? modeToTabs[mode]
    : accountExists
    ? "login"
    : "sign up";
}

function Auth() {
  const history = useHistory();
  const url = new URL(window.location.href);
  const actionCode = url.searchParams.get("oobCode");

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(getDefaultTab(url));

  useEffect(() => {
    setInputs({
      email: "",
      password: "",
    });
    setErrors({});

    if (tab === "verify email") {
      handleVerifyEmail();
    }
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
        setMessage({
          type: "success",
          title: "Success!",
          text: "Check your email for a verification link",
        });
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
        setLoading(false);
        // sign in user (redirect is automatic through onAuthStateChanged function in App.js)
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err);
      });
  };

  const handleForgotPassword = () => {
    const inputErrors = validate(inputs);
    const errorExists = Object.keys(inputErrors).some((v) => inputErrors[v]);

    if (errorExists) {
      setErrors(inputErrors);
      return;
    }

    setLoading(true);

    const { email } = inputs;

    sendPasswordResetEmail(email)
      .then(() => {
        setMessage({
          type: "success",
          title: "Success!",
          text: "Check your email for a password reset link",
        });
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err);
      });
  };

  const handleResetPassword = () => {
    const inputErrors = validate(inputs);
    const errorExists = Object.keys(inputErrors).some((v) => inputErrors[v]);

    if (errorExists) {
      setErrors(inputErrors);
      return;
    }

    setLoading(true);

    const { newPassword } = inputs;

    resetPassword(actionCode, newPassword)
      .then(() => {
        setLoading(false);
        setMessage({
          type: "success",
          title: "Success!",
          text: "Your password has been reset!",
        });
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err);
      });
  };

  const handleVerifyEmail = () => {
    setLoading(true);
    verifyUser(actionCode)
      .then(() => {
        setLoading(false);
        setMessage({
          type: "success",
          title: "Verification successful!",
          text: "Your email has now been verified!",
        });
      })
      .catch((err) => {
        setLoading(false);
        setMessage({
          type: "failure",
          title: "Verification expired",
          text: "Your email verification was unsuccessful!",
        });
      });
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    verifyUser(actionCode)
      .then(() => {
        setLoading(false);
        setMessage({
          type: "success",
          title: "Verification successful!",
          text: "Your email has now been verified!",
        });
      })
      .catch((err) => {
        setLoading(false);
        setMessage({
          type: "failure",
          title: "Verification expired",
          text: "Your email verification was unsuccessful!",
        });
      });
  };

  const handleFacebookAuth = () => {
    setLoading(true);
    verifyUser(actionCode)
      .then(() => {
        setLoading(false);
        setMessage({
          type: "success",
          title: "Verification successful!",
          text: "Your email has now been verified!",
        });
      })
      .catch((err) => {
        setLoading(false);
        setMessage({
          type: "failure",
          title: "Verification expired",
          text: "Your email verification was unsuccessful!",
        });
      });
  };

  return (
    <Box>
      <Header />
      <AuthBox>
        {message ? (
          <AuthMessage
            setTab={setTab}
            type={message.type}
            title={message.title}
            message={message.text}
            setMessage={setMessage}
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
              handleGoogleAuth={handleGoogleAuth}
              handleFacebookAuth={handleFacebookAuth}
            />
            <Signup
              tab="sign up"
              inputs={inputs}
              errors={errors}
              loading={loading}
              setTab={setTab}
              handleInputs={handleInputs}
              handleSignup={handleSignup}
              handleGoogleAuth={handleGoogleAuth}
              handleFacebookAuth={handleFacebookAuth}
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
            <ResetPassword
              tab="reset password"
              inputs={inputs}
              errors={errors}
              loading={loading}
              setTab={setTab}
              handleInputs={handleInputs}
              handleResetPassword={handleResetPassword}
            />
          </AuthCard>
        )}
      </AuthBox>
    </Box>
  );
}

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

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
  justify-content: center;
  align-items: center;
  margin-top: 54px;
  height: 100%;
  width: 350px;
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const AuthCard = styled(Card)`
  width: 100%;
`;

export default Auth;
