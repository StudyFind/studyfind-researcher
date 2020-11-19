import React from "react";
import { FormControl, Input, FormLabel, FormErrorMessage } from "@chakra-ui/react";

function Field({ name, value, label, placeholder, error, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(name, value);
  };

  return (
    <FormControl isInvalid={error}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input value={value} placeholder={placeholder} onChange={handleChange} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default Field;
