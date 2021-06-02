import React from "react";

import { FormErrorMessage } from "@chakra-ui/react";

export const Error = ({ error, ...rest }) => {
  return error ? <FormErrorMessage {...rest}>{error}</FormErrorMessage> : null;
};
