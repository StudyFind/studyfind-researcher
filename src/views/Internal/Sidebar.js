import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { signout } from "database";

import StudyFindLogo from "images/logo.png";

import {
  FaChartPie,
  FaClipboard,
  FaBell,
  FaComment,
  FaCalendarAlt,
  FaCog,
  FaUser,
} from "react-icons/fa";

import { Button } from "@chakra-ui/core";

function Sidebar() {
  const location = useLocation();

  const links = [
    // { name: "Dashboard", path: "/dashboard", icon: <FaChartPie /> },
    { name: "Studies", path: "/studies", icon: <FaClipboard /> },
    // { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Messages", path: "/messages", icon: <FaComment /> },
    // { name: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Account", path: "/account", icon: <FaUser /> },
  ];

  return (
    <Box>
      <Head to="/">
        <Logo src={StudyFindLogo} />
        <Name>StudyFind</Name>
      </Head>
      <Links>
        {links.map((link, index) => (
          <NavLink key={index} to={link.path} selected={location.pathname === link.path}>
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </Links>
      <Signout>
        <SignoutButton onClick={signout} leftIcon="arrow-back" w="100%" variantColor="black">
          Sign Out
        </SignoutButton>
      </Signout>
    </Box>
  );
}

const Box = styled.div`
  width: 250px;
  height: 100vh;
  background: teal;
  position: fixed;
  display: flex;
  flex-direction: column;
`;

const Head = styled(Link)`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: 15px;
`;

const Logo = styled.img`
  width: 25px;
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
`;

const Links = styled.div`
  display: grid;
  margin-bottom: auto;
`;

const Signout = styled.div`
  padding: 10px;
`;

const SignoutButton = styled(Button)`
  justify-content: flex-start !important;
  &:hover {
    background: rgb(0, 0, 0, 0.1) !important;
  }
`;

const NavLink = styled(Link)`
  padding: 20px;
  display: flex;
  grid-gap: 12px;
  align-items: center;
  color: rgb(255, 255, 255, 0.5);
  font-size: 16px;
  font-weight: 500;

  ${(props) =>
    props.selected &&
    `
    color: white;
    background: rgb(0, 0, 0, 0.1);
  `}
`;

export default Sidebar;
