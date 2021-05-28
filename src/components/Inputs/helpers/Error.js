import React from "react";
import { FormErrorMessage } from "@chakra-ui/react";

function Error({ error, ...rest }) {
  const isString = (value) => typeof value === "string" || value instanceof String;
  return (
    error &&
    isString(error) &&
    error.trim() && <FormErrorMessage {...rest}>{error}</FormErrorMessage>
  );
}

export default Error;
