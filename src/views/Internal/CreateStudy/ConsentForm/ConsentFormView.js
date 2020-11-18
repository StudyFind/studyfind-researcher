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
} from "@chakra-ui/react";

function ConsentForm({ loading, status, error, handleFileSelect, handleFileUpload }) {
  return (
    <div>
      <Heading size="lg" mb="10px">
        Upload Consent Form
      </Heading>
      <Text mb="10px" color="gray.500">
        This Consent Form will be displayed to interested participants when they decide to enroll
        for this study. They will have to agree to the terms of this consent form before completing
        their enrollment.
      </Text>
      <Inputs>
        {loading ? (
          <Progress hasStripe value={status} colorScheme="blue" />
        ) : (
          <FormControl isInvalid={error}>
            <FileInput type="file" onChange={handleFileSelect} isInvalid={error} />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        )}
        <Button
          colorScheme="blue"
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
