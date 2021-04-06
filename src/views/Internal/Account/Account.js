import React, { useState, useEffect } from "react";
import { signout } from "database/auth";

import { Flex, Grid, Heading, Button, Divider } from "@chakra-ui/react";
import {
  FaDoorOpen,
  FaUser,
  FaMapMarkedAlt,
  FaBell,
  FaCalendarCheck,
  FaComment,
  FaShieldAlt,
} from "react-icons/fa";

import Profile from "./Profile/Profile";
import Timezone from "./Timezone/Timezone";
import Notifications from "./Notifications/Notifications";
import Security from "./Security/Security";

import AccountTab from "./AccountTab";

function Account({ user }) {
  const tabs = [
    {
      text: "profile",
      icon: <FaUser />,
      content: <Profile user={user} />,
    },
    {
      text: "timezone",
      icon: <FaMapMarkedAlt />,
      content: <Timezone user={user} />,
    },
    {
      text: "calendar",
      icon: <FaCalendarCheck />,
      content: <div />,
    },
    {
      text: "templates",
      icon: <FaComment />,
      content: <div />,
    },
    {
      text: "notifications",
      icon: <FaBell />,
      content: <Notifications user={user} />,
    },
    {
      text: "security",
      icon: <FaShieldAlt />,
      content: <Security />,
    },
  ];

  const [selected, setSelected] = useState(0);
  const size = tabs.length;

  const handleKeyDown = (e) => {
    if (document.activeElement.className.split(" ").includes("tab")) {
      if (e.keyCode === 40 || e.keyCode === 39) {
        e.preventDefault();
        setSelected(selected === size - 1 ? 0 : selected + 1);
      }

      if (e.keyCode === 38 || e.keyCode === 37) {
        e.preventDefault();
        setSelected(selected === 0 ? size - 1 : selected - 1);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => document.removeEventListener("keydown", handleKeyDown, false);
  }, [handleKeyDown]);

  return (
    <>
      <Flex justify="space-between" align="center" mb="25px">
        <Heading size="lg">Account</Heading>
        <Button colorScheme="red" onClick={signout} leftIcon={<FaDoorOpen />}>
          Sign out
        </Button>
      </Flex>
      <Divider />
      <Flex gridGap="50px">
        <Grid gap="10px" maxH="0" w="180px" my="30px">
          {tabs.map((t, i) => (
            <AccountTab
              key={i}
              text={t.text}
              icon={t.icon}
              onClick={() => setSelected(i)}
              isSelected={selected === i}
              setSelected={setSelected}
            />
          ))}
        </Grid>
        <Grid gap="30px" py="30px" w="360px">
          {tabs[selected].content}
        </Grid>
      </Flex>
    </>
  );
}

export default Account;
