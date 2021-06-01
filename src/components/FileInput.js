import React from "react";
import lodash from "lodash";

import {
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

function FileInput({ label, error, accept, onChange }) {
  const handleChange = (e) => onChange(e.target.files[0]);

  return (
    <FormControl isInvalid={error}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type="file"
        p="4px !important"
        bg={error ? "red.100" : "white"}
        isInvalid={error}
        accept={accept}
        onChange={handleChange}
      />
      {error && lodash.isString(error) && (
        <FormErrorMessage>{error}</FormErrorMessage>
      )}
    </FormControl>
  );
}

export default FileInput;
