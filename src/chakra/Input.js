import React from "react";
import { FormControl, Input, FormLabel, FormErrorMessage } from "@chakra-ui/core";

function Field({ name, value, label, placeholder, error, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(name, value);
  };

  return (
    <FormControl isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      <Input value={value} placeholder={placeholder} onChange={handleChange} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default Field;
