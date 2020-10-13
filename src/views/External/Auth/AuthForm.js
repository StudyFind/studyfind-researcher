import React, { useState, useEffect } from "react";

import { Input, Button } from "components";
import { Tab, Heading, Link } from "./styles";

import AuthSocial from "./AuthSocial";

function validateEmail(email) {
  if (!email) return " ";
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const checkValid = emailRegex.test(email.toLowerCase());
  if (!checkValid) return "Email is invalid";
  return "";
}

function validatePassword(password) {
  if (!password) return " ";
  const checkCase = password !== password.toLowerCase();
  const checkSize = password.length > 7;
  if (!checkCase && !checkSize)
    return "Password must have at least 8 digits and one capital letter";
  if (!checkCase) return "Password must have a capital letter";
  if (!checkSize) return "Password must be at least 8 characters long";
  return "";
}

function validate(inputs) {
  const errors = {};

  for (const i in inputs) {
    const value = inputs[i];
    if (value !== undefined) {
      switch (i) {
        case "email":
          errors[i] = validateEmail(value);
          break;
        case "password":
          errors[i] = validatePassword(value);
          break;
        default:
          errors[i] = !value;
          break;
      }
    }
  }
  return errors;
}

function AuthForm({
  heading,
  initial,
  button,
  social,
  setTab,
  redirect,
  onSubmit,
  onSuccess,
  onFailure,
}) {
  const [inputs, setInputs] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const setForm = (name, value) => {
    const newInputs = { ...inputs, [name]: value.trim() };
    const newErrors = { ...errors, ...validate({ [name]: value }) };
    setInputs(newInputs);
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const errors = validate(inputs);
    setErrors(errors);

    if (Object.keys(errors).some((v) => errors[v])) {
      return;
    }

    setLoading(true);
    onSubmit(inputs)
      .then((data) => {
        setLoading(false);
        onSuccess(data);
      })
      .catch((error) => {
        setLoading(false);
        setErrors(error);
        onFailure(error);
      });
  };

  return (
    <Tab handleSubmit={handleSubmit}>
      <Heading>{heading}</Heading>

      {inputs.email !== undefined && (
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={inputs.email}
          error={errors.email}
          onChange={setForm}
        />
      )}

      {inputs.password !== undefined && (
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          error={errors.password}
          onChange={setForm}
        />
      )}

      {inputs.newPassword !== undefined && (
        <Input
          name="newPassword"
          type="newPassword"
          placeholder="New Password"
          value={inputs.newPassword}
          error={errors.newPassword}
          onChange={setForm}
        />
      )}

      <Button onClick={handleSubmit} loading={loading}>
        {button}
      </Button>

      {social && <AuthSocial />}

      <Link onClick={() => setTab(redirect && redirect.tab)}>{redirect && redirect.prompt}</Link>
    </Tab>
  );
}

export default AuthForm;
