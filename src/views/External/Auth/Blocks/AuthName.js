import React from "react";
import { TextInput } from "components";

function AuthName({ value, error, onChange }) {
  return (
    <TextInput name="name" value={value} error={error} onChange={onChange} placeholder="Name" />
  );
}

export default AuthName;
