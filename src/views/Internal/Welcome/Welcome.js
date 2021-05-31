import React, { useState, useEffect, useContext } from "react";
import { StudiesContext } from "context";

import { auth } from "database/firebase";
import { useHistory } from "react-router";
import { welcomeAccount } from "database/cloud";
import { Heading } from "@chakra-ui/react";

import WelcomeLoading from "./WelcomeLoading";
import WelcomeList from "./WelcomeList";
import WelcomeEmpty from "./WelcomeEmpty";

function Welcome() {
  const history = useHistory();
  const studies = useContext(StudiesContext);
  const unpublished = studies.filter((study) => !study.published);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth.currentUser.emailVerified) {
      history.push("/");
      return;
    }

    welcomeAccount()
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const render = () => {
    if (loading) return <WelcomeLoading />;
    if (error) return <div>Error: {error}</div>;
    if (studies.length) return <WelcomeList studies={unpublished} />;
    return <WelcomeEmpty />;
  };

  return (
    <>
      <Heading size="lg" mb="10px">
        Welcome to StudyFind!
      </Heading>
      {render()}
    </>
  );
}

export default Welcome;
