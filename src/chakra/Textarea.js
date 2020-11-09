import React, { useState } from "react";
import styled from "styled-components";
import { Text, FormControl, Textarea, Input, FormLabel, FormErrorMessage } from "@chakra-ui/core";

function Field({ name, value, label, height, placeholder, limit, error, onChange }) {
  const [count, setCount] = useState(value.length);

  const handleChange = (e) => {
    const value = e.target.value;
    setCount(value.length);
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
      />
      {limit && <Limit color="gray.500">{`${count}/${limit}`}</Limit>}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

const Limit = styled(Text)`
  text-align: right;
`;

export default Field;
