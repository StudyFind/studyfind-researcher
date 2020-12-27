import React from "react";
import styled from "styled-components";
import { Spinner } from "components";

function Page({ children, isLoading }) {
  return <Box>{isLoading ? <Spinner /> : children}</Box>;
}

const Box = styled.div`
  padding: 40px;
  height: 100%;
  background: #f8f9fa;
`;

export default Page;
