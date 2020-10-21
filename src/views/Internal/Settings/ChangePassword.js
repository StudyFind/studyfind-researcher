import React, { useState } from "react";
import styled from "styled-components";

import { validate } from "functions";
import { changePassword } from "database";
import { Card, Form, Input, Button } from "components";

function ChangePassword() {
  const [inputs, setInputs] = useState({ old_password: "", new_password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInput = (name, value) => {
    setInputs({ ...inputs, [name]: value.trim() });
    setErrors({ ...errors, ...validate.password(value) });
  };

  const handleChangePassword = async () => {
    const errors = validate.all(inputs);
    setErrors(errors);

    if (Object.keys(errors).some((v) => errors[v])) {
      return;
    }

    const { old_password, new_password } = inputs;

    setLoading(true);
    changePassword(old_password, new_password)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setErrors({ old_password: err.password, new_password: "" });
        setLoading(false);
      });
  };

  return (
    <AuthCard>
      <AuthTab handleSubmit={handleChangePassword}>
        <AuthHeading>Change Password</AuthHeading>
        <Input
          name="old_password"
          type="password"
          placeholder="Old Password"
          value={inputs.old_password}
          error={errors.old_password}
          onChange={handleInput}
        />

        <Input
          name="new_password"
          type="password"
          placeholder="New Password"
          value={inputs.new_password}
          error={errors.new_password}
          onChange={handleInput}
        />

        <Button loading={loading} onClick={handleChangePassword}>
          Confirm Change Password
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
  color: #377dff;
  text-align: center;
`;

export default ChangePassword;
