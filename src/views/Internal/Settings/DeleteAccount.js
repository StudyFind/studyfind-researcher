import React, { useState } from "react";
import styled from "styled-components";

import { validate } from "functions";
import { deleteUser } from "database";
import { Card, Form, Input, Button } from "components";

function DeleteAccount() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, ...validate.all({ [name]: value }) });
  };

  const handleDeleteUser = () => {
    const errors = validate.all(inputs);
    setErrors(errors);

    if (Object.keys(errors).some((v) => errors[v])) {
      return;
    }

    const { email, password } = inputs;

    setLoading(true);
    deleteUser(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <AuthCard>
      <AuthTab handleSubmit={handleDeleteUser}>
        <AuthHeading>Delete Account</AuthHeading>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={inputs.email}
          error={errors.email}
          onChange={handleInput}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={inputs.password}
          error={errors.password}
          onChange={handleInput}
        />
        <Button color="danger" loading={loading} onClick={handleDeleteUser}>
          Confirm Delete Account
        </Button>
      </AuthTab>
    </AuthCard>
  );
}

const AuthCard = styled(Card)`
  width: 350px;
`;

const AuthTab = styled(Form)`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-gap: 15px;
`;

const AuthHeading = styled.h2`
  color: #de4437;
  text-align: center;
`;

export default DeleteAccount;
