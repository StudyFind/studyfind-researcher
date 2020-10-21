import React, { useState } from "react";

import { validate } from "functions";
import _ from "lodash";

import { Input, Button } from "components";
import { AuthTab, AuthHeading, AuthLink } from "./styles";

import AuthSocial from "./AuthSocial";

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

  const handleInput = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, ...validate.all({ [name]: value }) });
  };

  const handleSubmit = () => {
    const errors = validate.all(inputs);
    setErrors(errors);

    if (!_.isEmpty(errors)) {
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
    <AuthTab handleSubmit={handleSubmit}>
      <AuthHeading>{heading}</AuthHeading>

      {inputs.email !== undefined && (
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={inputs.email}
          error={errors.email}
          onChange={handleInput}
        />
      )}

      {inputs.password !== undefined && (
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          error={errors.password}
          onChange={handleInput}
        />
      )}

      <Button onClick={handleSubmit} loading={loading}>
        {button}
      </Button>

      {social && <AuthSocial />}

      <AuthLink onClick={() => setTab(redirect && redirect.tab)}>
        {redirect && redirect.prompt}
      </AuthLink>
    </AuthTab>
  );
}

export default AuthForm;
