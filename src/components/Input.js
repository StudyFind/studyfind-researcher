import React from "react";
import lodash from "lodash";

import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

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
  onChange,
  ...rest
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(name, value);
  };

  return (
    <FormControl isInvalid={error}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        {left && (
          <InputLeftElement w={leftWidth} display="flex" alignItems="center" p="0px" h="100%">
            {left}
          </InputLeftElement>
        )}
        <Input
          w="100%"
          pl={leftWidth || "1rem"}
          pr={rightWidth || "1rem"}
          value={value}
          placeholder={placeholder}
          _placeholder={error && { color: "gray.500" }}
          onChange={handleChange}
          bg={error ? "red.100" : "white"}
          {...rest}
        />
        {right && (
          <InputRightElement w={rightWidth} display="flex" alignItems="center" p="0px" h="100%">
            {right}
          </InputRightElement>
        )}
      </InputGroup>
      {error && lodash.isString(error) && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default Field;
