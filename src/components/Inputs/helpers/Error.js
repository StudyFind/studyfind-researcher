import React from "react";
import { FormErrorMessage } from "@chakra-ui/react";

export const Error = ({ error, ...rest }) => {
  return error && error.trim() ? <FormErrorMessage {...rest}>{error}</FormErrorMessage> : <div />;
};
