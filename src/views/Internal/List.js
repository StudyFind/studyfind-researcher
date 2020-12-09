import React from "react";
import styled from "styled-components";
import { Box } from "components";

function List({ children }) {
  return (
    <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
      {children}
    </Box>
  );
}

List.Row = styled.div`
  display: flex;
  align-items: flex-start;
  grid-gap: 10px;
  padding: 16px;

  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
  }
`;

export default List;
