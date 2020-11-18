import React from "react";
import styled from "styled-components";
import { compute } from "functions";

import { Heading, Text, Button, Box } from "@chakra-ui/react";

function Participants({ study, participants }) {
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
        <Button colorScheme="blue">Filter Participants</Button>
      </Head>
      <Box>
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
  padding: 10px 0;

  // &:nth-child(even) {
  //   background: #ebf8ff;
  // }

  // &:nth-child(odd) {
  //   background: white;
  // }

  border-top: 2px solid #f1f2f3;
  border-bottom: 2px solid #f1f2f3;
  margin-top: -2px;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
  margin-left: auto;
`;

export default Participants;
