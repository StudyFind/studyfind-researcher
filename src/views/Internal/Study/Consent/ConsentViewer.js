import React from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Heading, Button, Spinner } from "@chakra-ui/react";

function ConsentViewer({ study, setEdit }) {
  const [value, loading, error] = useDownloadURL(storage.ref(`consent/${study.nctID}.pdf`));

  const LOAD = (
    <PageLoader>
      <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="blue.500" size="lg" />
    </PageLoader>
  );

  const BODY = (
    <PageLoader>
      {value ? <PDFViewer src={value} /> : <strong>{error && error.message}</strong>}
    </PageLoader>
  );

  return (
    <>
      <Head>
        <Heading fontSize="28px">Consent Form</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload New File
        </Button>
      </Head>
      <p>{loading ? LOAD : BODY}</p>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 500px;
`;

export default ConsentViewer;
