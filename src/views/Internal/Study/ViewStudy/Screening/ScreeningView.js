import React from "react";
import styled from "styled-components";

import { Box, Heading, Message, Button, Tag, Text } from "@chakra-ui/react";

function SurveyView({ questions, setEdit }) {
  const BODY = (
    <>
      <Head>
        <Heading fontSize="28px">Screening</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Edit Screening
        </Button>
      </Head>
      <Table>
        <thead>
          <tr>
            <HeadCell>Type</HeadCell>
            <HeadCell>Question</HeadCell>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <BodyCell nowrap>
                <Tag colorScheme={question.type === "Inclusion" ? "green" : "red"}>
                  {question.type}
                </Tag>
              </BodyCell>
              <BodyCell nowrap>
                <Text color="gray.600">{question.prompt}</Text>
              </BodyCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );

  const EMPTY = (
    <Box h="500px">
      <Message
        type="neutral"
        title="Create screening survey"
        description="The screening survey allows you to screen participants using your inclusion and exclusion eligibility criteria"
      >
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Create Survey
        </Button>
      </Message>
    </Box>
  );

  return questions.length ? BODY : EMPTY;
}

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

export default SurveyView;
