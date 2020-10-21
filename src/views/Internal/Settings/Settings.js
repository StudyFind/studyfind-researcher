import React from "react";
import styled from "styled-components";

import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function Settings() {
  return (
    <Box>
      <ChangePassword />
      <DeleteAccount />
    </Box>
  );
}

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Settings;
