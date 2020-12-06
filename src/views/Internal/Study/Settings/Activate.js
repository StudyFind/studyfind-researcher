import React from "react";
import styled from "styled-components";
import { Heading, Text, Switch, Badge } from "@chakra-ui/react";
import { updateStudy } from "database/studies";

function Activate({ study, setStudy }) {
  const handleToggle = () => {
    const updated = { ...study, activated: !study.activated };
    updateStudy(updated);
    setStudy(updated);
  };

  return (
    <Section>
      <Heading mb="8px" size="md">
        Recruitment Status
      </Heading>
      {study.activated ? (
        <Badge colorScheme="green" fontSize="0.8rem">
          ACTIVE
        </Badge>
      ) : (
        <Badge colorScheme="red" fontSize="0.8rem">
          INACTIVE
        </Badge>
      )}
      {/* <Text my="8px">
        <List>
          <li>
            <Badge colorScheme="green">ACTIVE</Badge> indicates that participants can see and
            enroll in your study
          </li>
          <li>
            <Badge colorScheme="red">INACTIVE</Badge> indicates that participants can neither see
            nor enroll in your study
          </li>
        </List>
      </Text> */}

      <Text color="gray.500" my="8px">
        Your study status corresponds to whether your are currently recruiting. A study status of
        active allows participants to enroll in your study. A study status of inactive prevents
        participants from enrolling in your study.
      </Text>

      <Switch
        size="lg"
        isDisabled={!study.published}
        isChecked={study.activated}
        onChange={handleToggle}
      />
    </Section>
  );
}

const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #f1f2f3;
`;

const Head = styled.div``;

export default Activate;
