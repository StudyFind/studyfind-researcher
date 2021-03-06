import React from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";

function Loader({ text, height, width }) {
  return (
    <Flex gridGap="10px" justify="center" align="center" height={height || "100%"} width={width}>
      <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="blue.500" size="lg" />
      <Text fontSize="lg">{text}</Text>
    </Flex>
  );
}

export default Loader;
