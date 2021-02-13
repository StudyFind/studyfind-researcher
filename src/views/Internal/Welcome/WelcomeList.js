import React from "react";
import { Text, Link } from "@chakra-ui/react";
import { List } from "components";

import WelcomeStudy from "./WelcomeStudy";

function WelcomeList({ studies }) {
  return (
    <>
      <Text mb="20px" color="gray.500">
        Here is a list of studies that we found on{" "}
        <Link color="blue.500" href="https://clinicaltrials.gov" target="_blank">
          clinicaltrials.gov
        </Link>{" "}
        that match the email associated with your StudyFind account. Please accept or remove them
        based on whether you want to add them to your StudyFind account. You can always add studies
        to your account in the future using their NCT ID.
      </Text>
      <List>
        {studies.map((study, index) => (
          <List.Row key={index}>
            <WelcomeStudy study={study} />
          </List.Row>
        ))}
      </List>
    </>
  );
}

export default WelcomeList;
