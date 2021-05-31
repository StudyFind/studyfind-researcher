import React from "react";
import { TextInput } from "components";

function AuthEmail({ value, error, onChange }) {
  return (
    <TextInput
      size="lg"
      name="email"
      type="email"
      value={value}
      error={error}
      onChange={onChange}
      placeholder="Email"
    />
  );
}

export default AuthEmail;
