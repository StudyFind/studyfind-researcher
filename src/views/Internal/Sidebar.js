import React from "react";
import styled from "styled-components";

function Sidebar() {
  return <Box>Sidebar</Box>;
}

const Box = styled.div`
  width: 250px;
  height: 100vh;
  background: teal;
  position: fixed;
`;

export default Sidebar;
