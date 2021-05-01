import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

function Link({ to, ...rest }) {
  // if link starts with "http" it is treated as external and is opened in new tab
  // else link is treated as internal react router link
  return to.substring(0, 4) === "http" ? (
    <ChakraLink href={to} isExternal color="blue.500" {...rest} />
  ) : (
    <ChakraLink as={RouterLink} to={to} color="blue.500" {...rest} />
  );
}

export default Link;
