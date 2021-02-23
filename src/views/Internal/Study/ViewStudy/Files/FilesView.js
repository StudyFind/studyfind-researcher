import React from "react";
import styled from "styled-components";
import { Flex, Heading, Button, Text } from "@chakra-ui/react";

function FilesViewer({ setEdit, files }) {
  return (
    <>
      <Flex justify="space-between" align="center" m="15px 0">
        <Heading fontSize="28px">Files</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Edit File
        </Button>
      </Flex>
      <Table>
        <thead>
          <tr>
            <HeadCell>Name</HeadCell>
            <HeadCell>Link</HeadCell>
          </tr>
        </thead>
        <tbody>
          {files.map((file, i) => (
            <tr key={i}>
              <BodyCell nowrap>
                <Text color="gray.600">{file.name}</Text>
              </BodyCell>
              <BodyCell nowrap>
                <Text color="gray.600">{file.link}</Text>
              </BodyCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
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
export default FilesViewer;
