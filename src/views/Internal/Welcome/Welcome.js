import React, { useState, useEffect } from "react";

import { welcomeAccount } from "database/studies";
import { Heading } from "@chakra-ui/react";

import WelcomeLoading from "./WelcomeLoading";
import WelcomeList from "./WelcomeList";
import WelcomeEmpty from "./WelcomeEmpty";

function Welcome({ studies }) {
  studies = studies.filter((study) => !study.published);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const isUserNew = localStorage.getItem("new") === "true";

    if (isUserNew) {
      welcomeAccount()
        .then(() => localStorage.setItem("new", "false"))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Heading size="lg" mb="10px">
        Welcome to StudyFind!
      </Heading>
      {loading ? (
        <WelcomeLoading />
      ) : error ? (
        <div>Error: {error}</div>
      ) : studies.length ? (
        <WelcomeList studies={studies} />
      ) : (
        <WelcomeEmpty />
      )}
    </>
  );
}

export default Welcome;
