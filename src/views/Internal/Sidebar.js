import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import StudyFindLogo from "images/logo.png";

import { Box, Flex, Grid, Heading, Text, Image } from "@chakra-ui/react";
import { FaBell, FaCalendarAlt, FaCog, FaPoll, FaThLarge, FaUserCircle } from "react-icons/fa";
import { Avatar, Tooltip } from "@chakra-ui/react";

function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaPoll /> },
    { name: "Studies", path: "/studies", icon: <FaThLarge /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
    { name: "Account", path: "/account", icon: <FaUserCircle /> },
  ];

  return (
    <Flex direction="column" w="280px" h="100vh" position="fixed" bg="blue.900" zIndex="100">
      <Logo to="/#">
        <Image h="1.75rem" mr="10px" src={StudyFindLogo} />
        <Heading fontSize="1.5rem" color="white">
          StudyFind
        </Heading>
      </Logo>
      <Grid mb="auto">
        {links.map((link, index) => (
          <NavLink key={index} to={link.path} selected={location.pathname === link.path}>
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </Grid>
      <Box p="15px">
        <Flex rounded="md" align="center">
          <Avatar name="Yohan Jhaveri" bg="blue.500" color="white" h="42px" w="42px" mr="10px" />
          <Box>
            <Text fontSize="0.9rem" color="white" fontWeight="500" isTruncated maxWidth="100px">
              Yohan Jhaveri
            </Text>
            <Tooltip label="yohanjhaveri@gmail.com" placement="right">
              <Text fontSize="0.9rem" color="gray.500" isTruncated maxWidth="180px">
                yohanjhaveri@gmail.com
              </Text>
            </Tooltip>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

const Logo = styled(Link)`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const NavLink = styled(Link)`
  padding: 25px 20px;
  display: flex;
  grid-gap: 12px;
  align-items: center;
  color: rgb(255, 255, 255, 0.5);
  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: white;
  }

  ${(props) =>
    props.selected &&
    `
    color: white;
    background: rgb(0, 0, 0, 0.2);
  `}
`;

export default Sidebar;
