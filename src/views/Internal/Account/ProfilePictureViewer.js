import React from "react";
import styled from "styled-components";
import { storage } from "database/firebase";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { Heading, Button, Spinner } from "@chakra-ui/react";

function PictureViewer({ user, setEdit }) {
  var pictureName = user.uid
  const [tempvalue, temploading, temperror] = useDownloadURL(storage.ref(`profile-pics/${pictureName}.png`));
  if (!tempvalue) {
      pictureName = undefined
  }
  const [value, loading, error] = useDownloadURL(storage.ref(`profile-pics/${pictureName}.png`));

    
  const LOAD = (
    <PageLoader>
      <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="blue.500" size="lg" />
    </PageLoader>
  );

  const BODY = (
    <PageLoader>
      {value ? <PictureViewerBox src={value} /> : <strong>{error && error.message}</strong>}
    </PageLoader>
  );

  return (
    <>
      <Head>
        <Heading fontSize="28px">Profile Picture</Heading>
      </Head>
      <p>{loading ? LOAD : BODY}</p>
      <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload New Profile Picture
      </Button>
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
  height: 300px;
`;

const PictureViewerBox = styled.iframe`
  width: 100%;
  height: 200px;
`;

export default PictureViewer;