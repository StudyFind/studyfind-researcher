import React from "react";
import styled from "styled-components";

import { Heading } from "@chakra-ui/react";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function Settings() {
  return (
    <>
      <Heading size="lg" mb="25px">
        Settings
      </Heading>
      <Body>
        <ChangePassword />
        <DeleteAccount />
      </Body>
    </>
  );
}

const Body = styled.div`
  display: flex;
  grid-gap: 20px;
`;

export default Settings;
