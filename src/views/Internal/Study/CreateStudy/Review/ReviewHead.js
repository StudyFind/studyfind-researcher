import React from "react";
import { Heading, Text, Link } from "@chakra-ui/react";

function ReviewHead() {
  return (
    <>
      <Heading size="lg" mb="10px">
        Review Your Study
      </Heading>
      <Text mb="15px" color="gray.500">
        Please check that the details of the study match what you would like to present to potential
        participants. If you would like to change the study title and description, you can edit
        these once the study is published. If you would like to change other study information,
        please make changes to the study on{" "}
        <Link color="blue.500" href="https://clinicaltrials.gov" target="_blank">
          clinicaltrials.gov
        </Link>{" "}
        and update the study through the StudyFind study settings.
      </Text>
    </>
  );
}

export default ReviewHead;
