import { Heading, Text } from "@chakra-ui/react";

function EligibilityHead() {
  return (
    <>
      <Heading size="lg" mb="10px">
        Eligibility
      </Heading>
      <Text mb="10px" color="gray.500">
        Please enter basic participant eligiblity details like sex and age, whether your study
        accepts healthy volunteers, as well as any medical conditions relevant to you study
      </Text>
    </>
  );
}

export default EligibilityHead;
