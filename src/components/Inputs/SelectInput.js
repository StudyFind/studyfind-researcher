import React from "react";
import { Label, Error } from "./helpers";
import { Select, FormControl } from "@chakra-ui/react";

function SelectInput({ name, value, label, placeholder, error, options, onChange, ...rest }) {
  const handleChange = (e) => onChange(name, e.target.value);

  return (
    <FormControl isInvalid={!!error}>
      <Label label={label} />
      <Select
        bg={error ? "red.100" : "white"}
        textTransform="capitalize"
        placeholder={placeholder}
        _placeholder={{ color: error && "gray.500" }}
        value={value}
        onChange={handleChange}
        {...rest}
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Select>
      <Error error={error} />
    </FormControl>
  );
}

export default SelectInput;
