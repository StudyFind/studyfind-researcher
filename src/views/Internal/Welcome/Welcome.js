import React from "react";
import { Heading } from "@chakra-ui/react";

import WelcomeList from "./WelcomeList";
import WelcomeEmpty from "./WelcomeEmpty";

function Welcome({ studies }) {
  return (
    <>
      <Heading size="lg" mb="10px">
        Welcome to StudyFind!
      </Heading>
      {studies.length ? <WelcomeList studies={studies} /> : <WelcomeEmpty />}
    </>
  );
}

export default Welcome;
