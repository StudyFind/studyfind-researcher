import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { Document, pdfjs } from 'react-pdf'
import { Heading, Button, Box } from "@chakra-ui/react";
import { Message, Spinner } from "components";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ConsentViewer({ study, setEdit }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    (async () => {
      let url = await storage.ref(`consent/${study.id}.pdf`).getDownloadURL();
      if (!url) {
        setUrl('');
      }
      setUrl(url);
      console.log(url);
    })()
  }, [study]);



  const LOAD = (
    <Box h="500px" w="100%">
      <Spinner />
    </Box>
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

  return (
    <>
      <Head>
        <Heading fontSize="28px">Consent</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload New File
        </Button>
      </Head>
      <Box h="500px" w="100%">
        <Document file={url} />
      </Box>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export default ConsentViewer;
