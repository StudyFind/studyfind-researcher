import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, FormControl, Textarea, FormLabel, FormErrorMessage } from "@chakra-ui/core";

function Field({ name, value, label, height, placeholder, limit, error, onChange }) {
  const [count, setCount] = useState();

  useEffect(() => {
    setCount(value.length);
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
      />
      <Bottom>
        <Error>{error}</Error>
        <Limit color="gray.500">{limit && `${count}/${limit}`}</Limit>
      </Bottom>
    </FormControl>
  );
}

const Limit = styled(Text)`
  text-align: right;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
`;

const Error = styled(FormErrorMessage)`
  margin-top: 0px !important;
`;

export default Field;
