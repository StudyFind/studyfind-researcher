import React from "react";
import { Box } from "@chakra-ui/react";
import { Loader } from "components";

function Page({ children, isLoading, ...rest }) {
  return (
    <Box p="40px" h="100%" bg="#f8f9fa" {...rest}>
      {isLoading ? <Loader /> : children}
    </Box>
  );
}

export default Page;
