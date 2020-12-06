import React, { useState }from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Text, Button, Avatar, Badge, IconButton, Tooltip } from "@chakra-ui/react";
import { FaClock, FaPhone, FaFilter, FaComment } from "react-icons/fa";

function ParticipantRow({ study, participant }) {
  const [screen, setScreen] = useState(false);
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
      <Buttons>
        <Tooltip label="Message">
          <IconButton color="gray.400" size="sm" bg="transparent" icon={<FaComment />} />
        </Tooltip>
        <Tooltip label="Screen">
          <IconButton color="gray.400" size="sm" bg="transparent" icon={<FaFilter />} />
        </Tooltip>
        <Tooltip label="Schedule">
          <IconButton color="gray.400" size="sm" bg="transparent" icon={<FaPhone />} />
        </Tooltip>
        <Tooltip label="Remind">
          <IconButton color="gray.400" size="sm" bg="transparent" icon={<FaClock />} />
        </Tooltip>
      </Buttons>
      <Link to={`/study/${study.nctID}/participant/${participant.id}`}>
        <Button size="sm" colorScheme="blue">
          Screen
        </Button>
      </Link>
      <Button size="sm" colorScheme="teal">
        Message
      </Button>
      <Button size="sm" colorScheme="orange">
        Schedule
      </Button>
      <Button size="sm" colorScheme="purple">
        Remind
      </Button>
    </Row>
  );
}
const showResult = () => console.log("a")

const Row = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: 10px;

  // &:nth-child(even) {
  //   background: #ebf8ff;
  // }

  // &:nth-child(odd) {
  //   background: white;
  // }

  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const Cell = styled.div`
  display: flex;
  grid-gap: 10px;
  flex: ${(props) => props.flex};
  align-items: center;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Table = styled.table`
  width: 100%;
  background: white;
`;

const HeadCell = styled.th`
  border: 1px solid #e1e2e3;
  background: #f1f2f3;
  padding: 8px 12px;
  text-align: left;
`;

const BodyCell = styled.td`
  border: 1px solid #e1e2e3;
  padding: 8px 12px;
`;

export default ParticipantRow;
