import React from "react";
import { Input, FormControl } from "@chakra-ui/react";
import { Label, Error } from "./helpers";

export const FileInput = ({ name, error, label, accept, onChange, ...rest }) => {
  const handleChange = (e) => {
    const files = e.target.files;
    const file = !!files && !!files.length && files[0];
    onChange(name, file);
  };

  return (
    <FormControl isInvalid={!!error}>
      <Label label={label} />
      <Input
        type="file"
        p="4px !important"
        w="100%"
        bg={error ? "red.100" : "white"}
        accept={accept}
        onChange={handleChange}
        {...rest}
      />
      <Error error={error} />
    </FormControl>
  );
};
