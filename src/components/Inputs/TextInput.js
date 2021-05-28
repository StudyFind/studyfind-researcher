import React from "react";
import { Label, Error } from "./helpers";
import { Input, FormControl } from "@chakra-ui/react";

function TextInput({ name, value, label, placeholder, error, onChange, ...rest }) {
  return (
    <FormControl isInvalid={!!error}>
      <Label label={label} />
      <Input
        w="100%"
        bg={error ? "red.100" : "white"}
        placeholder={placeholder}
        _placeholder={{ color: error && "gray.500" }}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        {...rest}
      />
      <Error error={error} />
    </FormControl>
  );
}

export default TextInput;
