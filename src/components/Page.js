import React from "react";
import styled from "styled-components";
import { Heading } from "@chakra-ui/react";
import { Spinner } from "components";

function Page({ heading, children, isLoading }) {
  const LOAD = <Spinner />;
  const BODY = (
    <>
      <Heading size="lg">{heading}</Heading>
      {children}
    </>
  );

  return <Box>{isLoading ? LOAD : BODY}</Box>;
}

const Box = styled.div`
  padding: 30px;
  height: 100%;
  background: #f8f9fa;
`;

export default Page;
