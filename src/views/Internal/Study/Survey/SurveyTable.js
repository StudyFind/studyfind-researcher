import React from "react";
import styled from "styled-components";

import { Heading, Button, Tag } from "@chakra-ui/core";
import { FaPencilAlt } from "react-icons/fa";

function SurveyTable({ questions, setEdit }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Survey Questions</Heading>
        <Button variantColor="blue" onClick={() => setEdit(true)}>
          Edit Questions
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
                <Tag size="sm" variantColor={question.type === "Inclusion" ? "green" : "red"}>
                  {question.type}
                </Tag>
              </BodyCell>
              <BodyCell nowrap>{question.prompt}</BodyCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Table = styled.table`
  width: 100%;
  background: white;
`;

const HeadCell = styled.th`
  border: 1px solid rgb(217, 218, 219);
  background: #f1f2f3;
  padding: 8px 12px;
  text-align: left;
`;

const BodyCell = styled.td`
  border: 1px solid rgb(217, 218, 219);
  padding: 8px 12px;
`;

export default SurveyTable;
