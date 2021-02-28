import React, { useState, useEffect } from "react";

import { Text, Flex, FormControl, Textarea, FormLabel, FormErrorMessage } from "@chakra-ui/react";

function Field({ name, value, label, height, placeholder, limit, error, onChange }) {
  const [count, setCount] = useState();

  useEffect(() => {
    setCount(value ? value.length : 0);
  }, [value]);

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(name, value);
  };

  return (
    <FormControl isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        h={height}
        value={value}
        maxLength={limit}
        placeholder={placeholder}
        onChange={handleChange}
        style={{ minHeight: 0 }}
        bg={error ? "red.100" : "white"}
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
