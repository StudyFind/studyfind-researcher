import React from "react";
import lodash from "lodash";

import { FormControl, Select, FormLabel, FormErrorMessage } from "@chakra-ui/react";

function Field({
  name,
  value,
  label,
  placeholder,
  error,
  left,
  leftWidth,
  right,
  rightWidth,
  options,
  onChange,
  ...rest
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(name, value);
  };

  return (
    <FormControl isInvalid={error} {...rest}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        bg={error ? "red.100" : "white"}
        textTransform="capitalize"
      >
        <option value=""></option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {error && lodash.isString(error) && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default Field;
