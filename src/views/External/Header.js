import React from "react";
import styled from "styled-components";
import { NavHashLink as HashLink } from "react-router-hash-link";
import { Heading } from "@chakra-ui/react";
import SFLogo from "images/logo.png";

function Header() {
  return (
    <Box>
      <Logo to="/#">
        <Icon src={SFLogo} />
        <Name fontSize="1.7rem">StudyFind</Name>
      </Logo>
    </Box>
  );
}

const Box = styled.div`
  position: fixed;
  top: 0;
  padding: 50px;
  width: 100vw;
`;

const Logo = styled(HashLink)`
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
