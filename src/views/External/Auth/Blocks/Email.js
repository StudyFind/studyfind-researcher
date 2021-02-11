import React from "react";
import { Input } from "components";

function Email({ value, error, onChange }) {
  return (
    <Input
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

export default Email;
