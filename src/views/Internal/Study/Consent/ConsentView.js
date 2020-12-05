import React from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Heading, Button, Spinner, Box, Message } from "components";

function ConsentViewer({ study, setEdit }) {
  const [value, loading, error] = useDownloadURL(storage.ref(`consent/${study.nctID}.pdf`));

  const LOAD = <Spinner />;

  const FORM = value ? <PDFViewer src={value} /> : <strong>{error && error.message}</strong>;

  const BODY = (
    <>
      <Head>
        <Heading fontSize="28px">Consent Form</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload New File
        </Button>
      </Head>
      <Box h="500px" w="100%">
        {loading ? LOAD : FORM}
      </Box>
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

  return value ? BODY : EMPTY;
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 100%;
`;

export default ConsentViewer;
