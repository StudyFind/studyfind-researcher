import React, { useState, useContext, useEffect } from "react";
import lodash from "lodash";
import { toasts } from "templates";
import { useTabs } from "hooks";
import { UserContext } from "context";
import { signout } from "database/auth";
import { firestore } from "database/firebase";

import { Flex, Grid, Heading, Button, Divider, useToast } from "@chakra-ui/react";
import { FaDoorOpen, FaUser, FaMapMarkedAlt, FaBell, FaShieldAlt } from "react-icons/fa";

import Profile from "./Profile/Profile";
import Timezone from "./Timezone/Timezone";
import Notifications from "./Notifications/Notifications";
import Security from "./Security/Security";

import AccountTab from "./AccountTab";
import AccountButtons from "./AccountButtons";

function Account() {
  const toast = useToast();
  const user = useContext(UserContext);
  const [inputs, setInputs] = useState(user);
  const [loading, setLoading] = useState(false);

  const isDifferent = !lodash.isEqual(user, inputs);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferences = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      },
    }));
  };

  const handleNotifications = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: value,
      },
    }));
  };

  const handleCategories = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        categories: {
          ...prev.notifications?.categories,
          [name]: value,
        },
      },
    }));
  };

  const handleCancel = () => {
    setInputs(user);
  };

  const handleUpdate = () => {
    setLoading(true);

    firestore
      .collection("researchers")
      .doc(user.id)
      .update(inputs)
      .then(() => toast(toasts.updatedAccount))
      .catch(() => toast(toasts.connectionError))
      .finally(() => setLoading(false));
  };

  const tabs = [
    {
      name: "profile",
      icon: <FaUser />,
      content: <Profile inputs={inputs} handleChange={handleChange} />,
    },
    {
      name: "timezone",
      icon: <FaMapMarkedAlt />,
      content: (
        <Timezone
          inputs={inputs}
          handleChange={handleChange}
          handlePreferences={handlePreferences}
        />
      ),
    },
    {
      name: "notifications",
      icon: <FaBell />,
      content: (
        <Notifications
          inputs={inputs}
          handleNotifications={handleNotifications}
          handleCategories={handleCategories}
        />
      ),
    },
    {
      name: "security",
      icon: <FaShieldAlt />,
      content: <Security />,
    },
  ];

  const [tabIndex, setTabIndex] = useTabs(tabs);

  useEffect(() => {
    !loading && handleCancel();
  }, [tabIndex, loading]);

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
              selected={tabIndex === i}
              onClick={() => setTabIndex(i)}
            />
          ))}
        </Grid>
        <Grid gap="30px" py="30px" w="360px">
          {tabs[tabIndex]?.content}
          {isDifferent && (
            <AccountButtons
              loading={loading}
              handleCancel={handleCancel}
              handleUpdate={handleUpdate}
            />
          )}
        </Grid>
      </Flex>
    </>
  );
}

export default Account;
