import { Heading, Text } from "@chakra-ui/react";

function ScreeningHead() {
  return (
    <>
      <Heading size="lg" mb="10px">
        Screening Survey
      </Heading>
      <Text mb="10px" color="gray.500">
        Please create basic Yes / No screening questions which participants will respond to when
        showing interest in your study. Their responses to these questions will be used to calculate
        their eligiblity score, a metric that should help you determine how likely a participant is
        to be eligible.
      </Text>
    </>
  );
}

export default ScreeningHead;
