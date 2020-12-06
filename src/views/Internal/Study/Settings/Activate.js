import React from "react";
import styled from "styled-components";
import { Heading, Text, Switch, Badge, Flex } from "@chakra-ui/react";
import { updateStudy } from "database/studies";

function Activate({ study, setStudy }) {
  const handleToggle = () => {
    const updated = { ...study, activated: !study.activated };
    updateStudy(updated);
    setStudy(updated);
  };

  return (
    <Section>
      <Flex align="center" mb="8px" gap="10px">
        <Heading size="md">Recruitment Status</Heading>
        {study.activated ? (
          <Badge colorScheme="green" fontSize="0.8rem">
            ACTIVE
          </Badge>
        ) : (
          <Badge colorScheme="red" fontSize="0.8rem">
            INACTIVE
          </Badge>
        )}
      </Flex>
      <Text color="gray.500" my="8px">
        Your study recruitment status allows / prevents participants from enrolling in your study.
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

export default Activate;
