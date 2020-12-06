import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Heading, Button, Tag, Text } from "@chakra-ui/react";
import { fetchStudy } from "database/studies";
import { fetchParticipant } from "database/participants";
import { Spinner } from "components";

function Screen() {
  const { id, participantid } = useParams();
  const [study, setStudy] = useState({});
  const [participant, setParticipant] = useState({});
  const [loadingStudy, setLoadingStudy] = useState(true);
  const [loadingParticipant, setLoadingParticipant] = useState(true);
  useEffect(() => {
    fetchStudy(id)
      .then(setStudy)
      .catch(console.log)
      .finally(() => setLoadingStudy(false));
  }, [id]);
  useEffect(() => {
    fetchParticipant(id, participantid)
      .then(setParticipant)
      .catch(console.log)
      .finally(() => setLoadingParticipant(false));
  }, [participantid]);
  const LOAD = (
    <PageLoader>
      <Spinner />
    </PageLoader>
  );

  const BODY = (

    <>
      <Head>
        <Heading fontSize="28px">Survey</Heading>
        <Button colorScheme="blue">Edit Questions</Button>
      </Head>
      <Table>
        <thead>
          <tr>
            <HeadCell>Type</HeadCell>
            <HeadCell>Question</HeadCell>
            <HeadCell>Response</HeadCell>
          </tr>
        </thead>
        <tbody>
          {study.questions.map((question, index) => (
            <tr key={index}>
              <BodyCell nowrap>
                <Tag colorScheme={question.type === "Inclusion" ? "green" : "red"}>
                  {question.type}
                </Tag>
              </BodyCell>
              <BodyCell nowrap>
                <Text color="gray.600">{question.prompt}</Text>
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
  return <Page>{(loadingStudy || loadingParticipant) ? LOAD : BODY}</Page>;
  
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

const Page = styled.div`
  padding: 20px;
  height: 100%;
  background: #f8f9fa;
`;

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Screen;
