import React from "react";
import { Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

function FileInput({ label, error, accept, onChange }) {
  return (
    <FormControl isInvalid={error}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type="file"
        p="4px !important"
        onChange={onChange}
        isInvalid={error}
        accept={accept}
        bg={error ? "red.100" : "white"}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default FileInput;
