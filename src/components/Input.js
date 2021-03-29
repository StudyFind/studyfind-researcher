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
    onChange(name, e.target.value);
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
          bg={error ? "red.100" : "white"}
          placeholder={placeholder}
          _placeholder={error && { color: "gray.500" }}
          value={value}
          onChange={handleChange}
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
