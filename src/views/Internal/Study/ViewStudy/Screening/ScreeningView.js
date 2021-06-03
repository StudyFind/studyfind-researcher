import styled from "styled-components";

import { Box, Flex, Heading, Button, Tag, Text } from "@chakra-ui/react";
import { Message } from "components";

function ScreeningView({ study, setEdit }) {
  return study?.questions?.length ? (
    <>
      <Flex justify="space-between" align="center" my="15px" h="40px">
        <Heading fontSize="28px">Screening</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Edit Screening
        </Button>
      </Flex>
      <Table>
        <thead>
          <tr>
            <HeadCell>Type</HeadCell>
            <HeadCell>Question</HeadCell>
          </tr>
        </thead>
        <tbody>
          {study?.questions?.map((question, i) => (
            <tr key={i}>
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
  ) : (
    <Box h="500px">
      <Message
        title="Create screening survey"
        description="The screening survey allows you to screen participants using your inclusion and exclusion eligibility criteria"
      >
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Create Survey
        </Button>
      </Message>
    </Box>
  );
}

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

export default ScreeningView;
