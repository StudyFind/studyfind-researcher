import React from "react";
import styled from "styled-components";
import { Text, Button, Avatar, Badge, IconButton, Tooltip } from "@chakra-ui/react";
import { FaClock, FaPhone, FaFilter, FaComment } from "react-icons/fa";

function ParticipantRow({ participant, handleDrawer }) {
  const statusColors = {
    interested: "gray",
    screened: "purple",
    consented: "cyan",
    accepted: "green",
    rejected: "red",
  };

  return (
    <Row>
      <Avatar
        size="1rem"
        h="30px"
        w="30px"
        bg="blue.500"
        name={participant.fakename.split("")[0]}
      />
      <Text fontWeight="500" mr="auto">
        {participant.fakename}
      </Text>
      <Badge size="sm" colorScheme={statusColors[participant.status]}>
        {participant.status}
      </Badge>
      <Text color="gray.400">{participant.score}% eligible</Text>
      <Button size="sm" colorScheme="blue" onClick={() => handleDrawer("screen", participant.id)}>
        Screen
      </Button>
      <Button size="sm" colorScheme="teal">
        Message
      </Button>
      <Button size="sm" colorScheme="orange">
        Remind
      </Button>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: 10px;

  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

export default ParticipantRow;
