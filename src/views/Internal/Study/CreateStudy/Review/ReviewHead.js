import { Link } from "@studyfind/components";
import { Heading, Text } from "@chakra-ui/react";

function ReviewHead() {
  return (
    <>
      <Heading size="lg" mb="10px">
        Review Your Study
      </Heading>
      <Text mb="15px" color="gray.500">
        Please check that the details of the study match what you would like to present to potential
        participants. You cannot change the study title, description and eligibility criteria once
        the study is published. If you would like to make changes to other study information, you
        can update the study on <Link to="https://clinicaltrials.gov">clinicaltrials.gov</Link> and
        update the study through the StudyFind study settings.
      </Text>
    </>
  );
}

export default ReviewHead;
