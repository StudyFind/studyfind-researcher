import React from "react";
import styled from "styled-components";

import { Heading } from "components";

import SFLogo from "images/logo.png";

function Header() {
  return (
    <Box>
      <Logo>
        <Icon src={SFLogo} />
        <Name fontSize="1.7rem">StudyFind</Name>
      </Logo>
    </Box>
  );
}

const Box = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  background: transparent;
  padding: 50px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 600px) {
    padding: 30px;
  }
`;

const Logo = styled.div`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.img`
  height: 2rem;
  margin-right: 10px;
`;

const Name = styled(Heading)``;

export default Header;
