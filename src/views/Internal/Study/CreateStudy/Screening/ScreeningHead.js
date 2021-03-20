import React from "react";
import { Heading, Text } from "@chakra-ui/react";

function ScreeningHead() {
  return (
    <>
      <Heading size="lg" mb="10px">
        Screening Survey
      </Heading>
      <Text mb="10px" color="gray.500">
        It is important that you modify these inclusion and exclusion criteria into{" "}
        <b>Yes / No / Maybe</b>
        &nbsp;questions. These questions will form a screening survey which will be asked to
        participants when they enroll for your study. Their responses to these questions will be
        used to calculate their eligiblity score, a metric that should help you determine how likely
        a participant is to be eligible.
      </Text>
    </>
  );
}

export default ScreeningHead;
