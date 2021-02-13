import React from "react";
import { Text, Button, Link as ExternalLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function WelcomeEmpty() {
  return (
    <>
      <Text mb="10px" color="gray.500">
        We could not find any studies that match your email on{" "}
        <ExternalLink color="blue.500" href="https://clinicaltrials.gov" target="_blank">
          clinicaltrials.gov
        </ExternalLink>
        . If you would like to add a study, please register your study on{" "}
        <ExternalLink color="blue.500" href="https://clinicaltrials.gov" target="_blank">
          clinicaltrials.gov
        </ExternalLink>{" "}
        and add your study to StudyFind using your registered study&apos;s NCT ID. In case
        you&apos;re wondering, we require that studies are registered on clinicaltrials.gov so we
        can verify that the study is authentic and validate the study owner.
      </Text>
      <Link to="/dashboard">
        <Button mt="20px" colorScheme="blue">
          Go to dashboard
        </Button>
      </Link>
    </>
  );
}

export default WelcomeEmpty;
