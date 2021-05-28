import React, { useState, useEffect } from "react";
import { Label, Error } from "./helpers";
import { Text, Flex, Textarea, FormControl } from "@chakra-ui/react";

function TextareaInput({ name, value, label, placeholder, limit, error, onChange, ...rest }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(value ? value.length : 0);
  }, [value]);

  return (
    <FormControl isInvalid={error}>
      <Label label={label} />
      <Textarea
        style={{ minHeight: 0 }}
        bg={error ? "red.100" : "white"}
        placeholder={placeholder}
        _placeholder={{ color: error && "gray.500" }}
        value={value}
        onChange={(e) => e.target.value <= limit && onChange(name, e.target.value)}
        maxLength={limit}
        {...rest}
      />
      <Flex justify="flex-end" align="center" my="4px">
        <Error error={error} mt="0" />
        <Text ml="auto" color="gray.500" fontSize="sm">
          {limit && `${count}/${limit}`}
        </Text>
      </Flex>
    </FormControl>
  );
}

export default TextareaInput;
