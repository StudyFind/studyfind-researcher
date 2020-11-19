import React, { useState } from "react";
import styled from "styled-components";
import { compute } from "functions";

import { Heading, Text, Button, Box } from "@chakra-ui/react";

import ParticipantsFilter from "./ParticipantsFilter";

function Participants({ study, participants }) {
  const [filter, setFilter] = useState(false);
  const [status, setStatus] = useState({});
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState("");

  study = { questions: [] };
  participants = [
    { fakename: "Amazing Alpaca", status: "Interested", responses: [] },
    { fakename: "Amazing Alpaca", status: "Interested", responses: [] },
    { fakename: "Amazing Alpaca", status: "Interested", responses: [] },
    { fakename: "Amazing Alpaca", status: "Interested", responses: [] },
    { fakename: "Amazing Alpaca", status: "Interested", responses: [] },
    { fakename: "Amazing Alpaca", status: "Interested", responses: [] },
  ];

  return (
    <>
      <Head>
        <Heading fontSize="28px">Participants</Heading>
        {filter ? (
          <Button colorScheme="gray" onClick={() => setFilter(false)}>
            Clear Filters
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={() => setFilter(true)}>
            Filter Participants
          </Button>
        )}
      </Head>
      {filter && <ParticipantsFilter />}
      <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
        {participants.map((participant, index) => (
          <Row key={index}>
            <Button size="sm" colorScheme="blue">
              Screen
            </Button>
            <Text fontSize="md" fontWeight="500">
              {participant.fakename}
            </Text>
            <Text color="gray.400">
              {compute.eligibilityScore(study.questions, participants.responses)}% eligible
            </Text>
            <Buttons>
              <Button size="sm" colorScheme="red">
                Reject
              </Button>
              <Button size="sm" colorScheme="green">
                Accept
              </Button>
            </Buttons>
          </Row>
        ))}
      </Box>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

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
  grid-gap: 10px;
  margin-left: auto;
`;

export default Participants;
