import React from "react";
import { Box } from "@chakra-ui/react";
import { Loader } from "./Loader";

export const Page = ({ children, isLoading, ...rest }) => (
  <Box p="40px" h="100%" bg="#f8f9fa" {...rest}>
    {isLoading ? <Loader /> : children}
  </Box>
);
