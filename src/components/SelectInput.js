import React from "react";
import lodash from "lodash";

import { Select, FormLabel, FormControl, FormErrorMessage } from "@chakra-ui/react";

function Field({ name, value, label, placeholder, error, options, onChange, ...rest }) {
  const handleChange = (e) => onChange(name, e.target.value);

  return (
    <FormControl isInvalid={error} {...rest}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        bg={error ? "red.100" : "white"}
        textTransform="capitalize"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {error && lodash.isString(error) && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default Field;
