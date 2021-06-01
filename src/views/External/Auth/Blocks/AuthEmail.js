import React from "react";
import { EmailInput } from "components";

function AuthEmail({ value, error, onChange }) {
  return (
    <EmailInput name="email" value={value} error={error} onChange={onChange} placeholder="Email" />
  );
}

export default AuthEmail;
