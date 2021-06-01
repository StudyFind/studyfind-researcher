import React, { useState, useEffect } from "react";

import { Text, Flex, Textarea, FormLabel, FormControl, FormErrorMessage } from "@chakra-ui/react";

function Field({ name, value, label, placeholder, limit, error, onChange, ...rest }) {
  const [count, setCount] = useState();

  useEffect(() => {
    setCount(value ? value.length : 0);
  }, [value]);

  const handleChange = (e) => onChange(name, e.target.value);

  return (
    <FormControl isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        style={{ minHeight: 0 }}
        bg={error ? "red.100" : "white"}
        placeholder={placeholder}
        _placeholder={error && { color: "gray.500" }}
        value={value}
        onChange={handleChange}
        maxLength={limit}
        {...rest}
      />
      <Flex justify="flex-end" align="center" my="4px">
        <FormErrorMessage mt="0">{error}</FormErrorMessage>
        <Text ml="auto" color="gray.500" fontSize="sm">
          {limit && `${count}/${limit}`}
        </Text>
      </Flex>
    </FormControl>
  );
}

export default Field;
