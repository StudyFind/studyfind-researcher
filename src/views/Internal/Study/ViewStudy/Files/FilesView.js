import React, { useState } from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Box, Flex, Heading, Button, Tag, Text } from "@chakra-ui/react";
import { Message, Loader } from "components";
import axios from "axios";

function FilesViewer({ study, setEdit, files }) {
  // const [value, loading, error] = useDownloadURL(storage.ref(`file/NCT04655001/dummy_file2.pdf`));
  // const LOAD = (
  //   <Box h="500px" w="100%">
  //     <Loader />
  //   </Box>
  // );

  // const FORM = value ? (
  //   <PDFViewer data={value} type="application/pdf" />
  // ) : (
  //   <strong>{error && error.message}</strong>
  // );

  const BODY = (
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
          {console.log(files.length)}
          {/* {files.forEach((file) => (
            <tr>
              <BodyCell nowrap>
                <Text color="gray.600">{file.fileName}</Text>
              </BodyCell>
              <BodyCell nowrap>
                <Text color="gray.600">{file.link}</Text>
              </BodyCell>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );

  const EMPTY = (
    <Box h="500px">
      <Message
        type="neutral"
        title="Upload consent form"
        description="The consent form allows participants to know details and risks of the research study and makes them aware of what they're signing up for"
      >
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload Consent Form
        </Button>
      </Message>
    </Box>
  );

  // return loading ? LOAD : value ? BODY : EMPTY;
  return BODY;
}

// const Head = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 15px 0;
// `;

// const PDFViewer = styled.object`
//   width: 100%;
//   height: 100%;
// `;
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
