import React from "react";
import { Text } from "@chakra-ui/react";
import { List, Link } from "components";

import WelcomeStudy from "./WelcomeStudy";

function WelcomeList({ studies }) {
  return (
    <>
      <Text mb="20px" color="gray.500">
        Here is a list of studies that we found on{" "}
        <Link to="https://clinicaltrials.gov">clinicaltrials.gov</Link> that match the email
        associated with your StudyFind account. Please accept or remove them based on whether you
        want them to be added to your StudyFind account. You can always add studies to your account
        in the future using their NCT ID.
      </Text>
      <List>
        {studies.map((study) => (
          <List.Row key={study.id}>
            <WelcomeStudy study={study} />
          </List.Row>
        ))}
      </List>
    </>
  );
}

export default WelcomeList;
