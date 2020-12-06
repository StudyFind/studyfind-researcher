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
  padding: 40px;
  display: flex;
  grid-gap: 20px;
`;

export default Settings;
