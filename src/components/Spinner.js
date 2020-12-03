import React from "react";
import { Spinner } from "@chakra-ui/react";

function Loader() {
  return <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="blue.500" size="lg" />;
}

export default Loader;
