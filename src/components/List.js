import React from "react";
import styled from "styled-components";
import { Box } from "@chakra-ui/react";

function List({ children }) {
  return (
    <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
      {children}
    </Box>
  );
}

List.Row = styled.div`
  border-bottom: 1px solid #f1f2f3;
  &:last-child {
    border-bottom: none;
  }
`;

export default List;
