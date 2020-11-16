import React from "react";
import styled from "styled-components";
import { Heading, Text, Switch, Badge } from "@chakra-ui/core";
import { updateStudy } from "database/studies";

function Activate({ study, setStudy }) {
  const handleToggle = () => {
    const updated = { ...study, activated: !study.activated };
    updateStudy(updated);
    setStudy(updated);
  };

  return (
    <Section>
      <Heading size="md">Change Status</Heading>
      <Text my="8px">
        <List>
          <li>
            <Badge variantColor="green">ACTIVE</Badge> indicates that participants can see and
            enroll in your study
          </li>
          <li>
            <Badge variantColor="red">INACTIVE</Badge> indicates that participants can neither see
            nor enroll in your study
          </li>
        </List>
      </Text>

      <Text color="black" fontWeight="bold" mt="24px" mb="8px">
        Current Status
        <br />
        {study.activated ? (
          <Badge variantColor="green" fontSize="0.8rem">
            ACTIVE
          </Badge>
        ) : (
          <Badge variantColor="red" fontSize="0.8rem">
            INACTIVE
          </Badge>
        )}
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

const List = styled.ul`
  padding-left: 20px;
`;

export default Activate;
