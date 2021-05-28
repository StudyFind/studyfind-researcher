import React from "react";
import { FormLabel } from "@chakra-ui/react";

function Label({ label, ...rest }) {
  return label && <FormLabel {...rest}>{label}</FormLabel>;
}

export default Label;
