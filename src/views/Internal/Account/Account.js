import React, { useContext } from "react";
import { useTabs } from "hooks";
import { UserContext } from "context";
import { signout } from "database/auth";

import { Flex, Grid, Heading, Button, Divider } from "@chakra-ui/react";
import {
  FaDoorOpen,
  FaUser,
  FaMapMarkedAlt,
  FaBell,
  // FaCalendarCheck,
  // FaComment,
  FaShieldAlt,
} from "react-icons/fa";

import Profile from "./Profile/Profile";
import Timezone from "./Timezone/Timezone";
import Notifications from "./Notifications/Notifications";
import Security from "./Security/Security";

import AccountTab from "./AccountTab";

function Account() {
  const user = useContext(UserContext);
  const tabs = [
    {
      name: "profile",
      icon: <FaUser />,
      content: <Profile user={user} />,
    },
    {
      name: "timezone",
      icon: <FaMapMarkedAlt />,
      content: <Timezone user={user} />,
    },
    // {
    //   name: "calendar",
    //   icon: <FaCalendarCheck />,
    //   content: <div />,
    // },
    // {
    //   name: "templates",
    //   icon: <FaComment />,
    //   content: <div />,
    // },
    {
      name: "notifications",
      icon: <FaBell />,
      content: <Notifications user={user} />,
    },
    {
      name: "security",
      icon: <FaShieldAlt />,
      content: <Security />,
    },
  ];

  const [tabIndex, setTabIndex] = useTabs(tabs);

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
              name={t.name}
              icon={t.icon}
              onClick={() => setTabIndex(i)}
              isSelected={tabIndex === i}
            />
          ))}
        </Grid>
        <Grid gap="30px" py="30px" w="360px">
          {tabs[tabIndex]?.content}
        </Grid>
      </Flex>
    </>
  );
}

export default Account;
