import React from "react";
import { Heading, Text } from "@chakra-ui/react";

function ScreenerHead() {
  return (
    <>
      <Heading size="lg" mb="10px">
        Modifying Eligibility Criteria
      </Heading>
      <Text mb="10px" color="gray.500">
        These exclusion and inclusion criteria will be used to automatically generate a screening
        survey for interested participants to answer in their process of enrolling.
      </Text>
    </>
  );
}

export default ScreenerHead;
