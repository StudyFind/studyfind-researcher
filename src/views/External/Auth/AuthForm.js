import React, { useState } from "react";

import { validate } from "./functions";

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

  const setForm = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, ...validate({ [name]: value }) });
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
    <AuthTab handleSubmit={handleSubmit}>
      <AuthHeading>{heading}</AuthHeading>

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
