import React, { useState, useEffect } from "react";
import { fetchStudies } from "database/studies";
import { Heading } from "@chakra-ui/react";
import { Page } from "components";

import WelcomeStudies from "./WelcomeStudies";
import WelcomeEmpty from "./WelcomeEmpty";

function Welcome({ user }) {
  user = {
    name: "Yohan Jhaveri",
  };
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies()
      .then(setStudies)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Page>
      <Heading size="lg" mb="10px">
        Welcome to StudyFind!
      </Heading>
      {studies.length ? <WelcomeStudies studies={studies} /> : <WelcomeEmpty />}
    </Page>
  );
}

export default Welcome;
