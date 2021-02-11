import React from "react";
import { Text, Link } from "@chakra-ui/react";
import { Loader } from "components";

function WelcomeLoading() {
  return (
    <>
      <Text mb="10px" color="gray.500">
        We are currently fetching studies associated with your email account from{" "}
        <Link color="blue.500" href="https://clinicaltrials.gov" target="_blank">
          clinicaltrials.gov
        </Link>
      </Text>
      <Loader />
    </>
  );
}

export default WelcomeLoading;
