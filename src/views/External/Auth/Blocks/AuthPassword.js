import React from "react";
import { PasswordInput } from "components";

function AuthPassword({ name, placeholder, value, error, onChange }) {
  return (
    <PasswordInput
      name={name || "password"}
      value={value}
      error={error}
      onChange={onChange}
      placeholder={placeholder || "Password"}
    />
  );
}

export default AuthPassword;
