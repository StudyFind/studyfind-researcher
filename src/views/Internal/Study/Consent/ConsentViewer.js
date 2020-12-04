import React from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Heading, Button, Spinner } from "components";

function ConsentViewer({ study, setEdit }) {
  const [value, loading, error] = useDownloadURL(storage.ref(`consent/${study.nctID}.pdf`));

  const LOAD = <Spinner />;

  const BODY = value ? <PDFViewer src={value} /> : <strong>{error && error.message}</strong>;

  return (
    <>
      <Head>
        <Heading fontSize="28px">Consent Form</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload New File
        </Button>
      </Head>
      {loading ? LOAD : BODY}
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
  height: 100%;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 100%;
`;

export default ConsentViewer;
