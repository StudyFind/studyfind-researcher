import React from "react";
import { Box } from "@chakra-ui/react";
import { Spinner } from "components";

function Page({ children, isLoading }) {
  return (
    <Box p="40px" h="100%">
      {isLoading ? <Spinner /> : children}
    </Box>
  );
}

export default Page;
