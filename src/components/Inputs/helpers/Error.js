import React from "react";
import { FormErrorMessage } from "@chakra-ui/react";

export const Error = ({ error, ...rest }) => {
  return error?.trim() && <FormErrorMessage {...rest}>{error}</FormErrorMessage>;
};
