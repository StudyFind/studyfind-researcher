import React from "react";
import { Label, Error } from "./helpers";
import { Input, FormControl } from "@chakra-ui/react";

function FileInput({ label, error, accept, onChange }) {
  return (
    <FormControl isInvalid={error}>
      <Label label={label} />
      <Input
        type="file"
        p="4px !important"
        bg={error ? "red.100" : "white"}
        isInvalid={error}
        accept={accept}
        onChange={(e) => onChange(e.target.files[0])}
      />
      <Error error={error} />
    </FormControl>
  );
}

export default FileInput;
