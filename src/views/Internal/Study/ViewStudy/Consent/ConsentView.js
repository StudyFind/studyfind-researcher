import React from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Heading, Button, Spinner, Box, Message } from "components";

function ConsentViewer({ study, setEdit }) {
  const [value, loading, error] = useDownloadURL(storage.ref(`consent/${study.id}.pdf`));

  const LOAD = (
    <Box h="500px" w="100%">
      <Spinner />
    </Box>
  );

  const FORM = value ? <PDFViewer src={value} /> : <strong>{error && error.message}</strong>;

  const BODY = (
    <>
      <Head>
        <Heading fontSize="28px">Consent</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload New File
        </Button>
      </Head>
      <Box h="500px" w="100%">
        {FORM}
      </Box>
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

  return loading ? LOAD : value ? BODY : EMPTY;
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
