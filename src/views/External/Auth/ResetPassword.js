import React, { useState } from "react";

import { Input, Button } from "components";
import { AuthTab, Heading, AuthLink } from "./styles";

function ResetPassword({
  inputs,
  errors,
  loading,
  setTab,
  handleInputs,
  handleResetPassword,
}) {
  return (
    <AuthTab handleSubmit={handleResetPassword}>
      <Heading>Reset Password</Heading>
      <Input
        name="password"
        type="password"
        placeholder="New Password"
        value={inputs.password}
        error={errors.password}
        onChange={handleInputs}
      />
      <Button color="primary" onClick={handleResetPassword} loading={loading}>
        Reset Password
      </Button>
      <AuthLink onClick={() => setTab("login")}> Return to login </AuthLink>
    </AuthTab>
  );
}

export default ResetPassword;
