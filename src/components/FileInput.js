import React from "react";
import lodash from "lodash";

import { Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

function FileInput({ label, error, accept, onChange }) {
  return (
    <FormControl isInvalid={error}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        type="file"
        p="4px !important"
        bg={error ? "red.100" : "white"}
        isInvalid={error}
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
      />
      {error && lodash.isString(error) && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}

export default FileInput;
