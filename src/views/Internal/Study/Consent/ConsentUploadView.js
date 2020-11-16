import React from "react";
import styled from "styled-components";
import {
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  Progress,
} from "@chakra-ui/core";

function ConsentForm({ setEdit, loading, status, error, handleFileSelect, handleFileUpload }) {
  return (
    <div>
      <Head>
        <Heading fontSize="28px">Upload Consent Form</Heading>
        <Button variantColor="gray" onClick={() => setEdit(false)}>
          Cancel
        </Button>
      </Head>
      <Inputs>
        {loading ? (
          <Progress hasStripe value={status} color="blue" />
        ) : (
          <FormControl isInvalid={error}>
            <FileInput type="file" onChange={handleFileSelect} isInvalid={error} />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        )}
        <Button
          variantColor="blue"
          onClick={handleFileUpload}
          loadingText="Uploading..."
          isLoading={loading}
          type="submit"
        >
          Upload
        </Button>
      </Inputs>
    </div>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Inputs = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 250px;
`;

const FileInput = styled(Input)`
  padding: 4px;
  padding-left: 4px !important;
  padding-right: 4px !important;
`;

export default ConsentForm;
