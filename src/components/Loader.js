import React from "react";
import { Flex, Text, Spinner } from "@chakra-ui/react";

function Loader({ text, height, width }) {
  return (
    <Flex
      gridGap="10px"
      justify="center"
      align="center"
      h={height || "100%"}
      w={width || "100%"}
    >
      <Spinner
        emptyColor="gray.200"
        color="blue.500"
        thickness="4px"
        speed="0.5s"
        size="lg"
      />
      <Text fontSize="lg" fontWeight="500">
        {text}
      </Text>
    </Flex>
  );
}

export default Loader;
