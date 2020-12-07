import React from "react";
import styled from "styled-components";

import { Heading, Button, Spinner } from "components";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function Settings() {
  return (
    <Page>
      <Heading mb="25px">Settings</Heading>
      <Body>
        <ChangePassword />
        <DeleteAccount />
      </Body>
    </Page>
  );
}

const Page = styled.div`
  padding: 30px;
`;

const Body = styled.div`
  display: flex;
  grid-gap: 20px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export default Settings;
