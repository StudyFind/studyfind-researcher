import React from "react";
import { Heading, Text } from "@chakra-ui/react";

function ConsentHead() {
  return (
    <>
      <Heading size="lg" mb="10px">
        Upload Consent Form
      </Heading>
      <Text mb="10px" color="gray.500">
        This consent form will be displayed to interested participants when they decide to enroll
        for this study. They will have to agree to the terms of this consent form before completing
        their enrollment.
      </Text>
    </>
  );
}

export default ConsentHead;
