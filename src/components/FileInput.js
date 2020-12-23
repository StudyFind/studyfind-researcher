import React from "react";
import styled from "styled-components";
import { Input, FormControl, FormErrorMessage, Progress } from "@chakra-ui/react";

function FileInput({ loading, status, error, accept, onChange }) {
  const LOADING = <Progress hasStripe value={status} colorScheme="blue" />;

  const DEFAULT = (
    <FormControl isInvalid={error}>
      <Field type="file" onChange={onChange} isInvalid={error} accept={accept} bg="white" />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );

  return loading ? LOADING : DEFAULT;
}

const Field = styled(Input)`
  padding: 4px !important;
`;

export default FileInput;
