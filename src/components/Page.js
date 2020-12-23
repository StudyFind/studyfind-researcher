import React from "react";
import styled from "styled-components";
import { Spinner } from "components";

function Page({ children, isLoading }) {
  const LOAD = <Spinner />;
  const BODY = children;
  return <Box>{isLoading ? LOAD : BODY}</Box>;
}

const Box = styled.div`
  padding: 30px;
  height: 100%;
  background: #f8f9fa;
`;

export default Page;
