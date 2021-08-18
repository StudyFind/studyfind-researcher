import { useState } from "react";

import VerticalTabs from "components/complex/VerticalTabs/VerticalTabs";

import ProfileParticipant from "components/feature/Account/Profile/ProfileParticipant";
import Notifications from "components/feature/Account/Notifications/Notifications";
import Timezone from "components/feature/Account/Timezone/Timezone";
import Location from "components/feature/Account/Location/Location";
import Security from "components/feature/Account/Security/Security";

import { Flex, Heading, Button, Divider, Box } from "@chakra-ui/react";
import {
  FaDoorOpen,
  FaUser,
  FaMapMarkedAlt,
  FaBell,
  FaShieldAlt,
  FaLocationArrow,
} from "react-icons/fa";
import AccountWrapper from "./AccountWrapper";

function AccountParticipant({
  user,
  handleUpdate: handleSave,
  handleSignOut,
  handleChangePassword,
  handleDeleteAccount,
}) {
  const [values, setValues] = useState(user);
  const [loading, setLoading] = useState(false);

  const haveInputsChanged = JSON.stringify(values) !== JSON.stringify(user);

  const handleCancel = () => {
    setValues(user);
  };

  const handleUpdate = () => {
    setLoading(true);
    handleSave()
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleSetProfileAttribute = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetNotificationsAttribute = (name, value) => {
    setValues((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: value,
      },
    }));
  };

  const handleSetLocationAttribute = (name, value) => {
    setValues((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleSetTimezoneAttribute = (name, value) => {
    setValues((prev) => ({
      ...prev,
      timezone: {
        ...prev.timezone,
        [name]: value,
      },
    }));
  };

  const tabs = [
    {
      name: "Profile",
      link: "/account/profile",
      icon: <FaUser />,
      content: (
        <AccountWrapper
          loading={loading}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          showButtons={haveInputsChanged}
        >
          <ProfileParticipant
            values={values}
            handleSetProfileAttribute={handleSetProfileAttribute}
          />
        </AccountWrapper>
      ),
    },
    {
      name: "Notifications",
      link: "/account/notifications",
      icon: <FaBell />,
      content: (
        <AccountWrapper
          loading={loading}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          showButtons={haveInputsChanged}
        >
          <Notifications
            values={values}
            handleSetNotificationsAttribute={handleSetNotificationsAttribute}
          />
        </AccountWrapper>
      ),
    },
    {
      name: "Timezone",
      link: "/account/timezone",
      icon: <FaMapMarkedAlt />,
      content: (
        <AccountWrapper
          loading={loading}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          showButtons={haveInputsChanged}
        >
          <Timezone values={values} handleSetTimezoneAttribute={handleSetTimezoneAttribute} />
        </AccountWrapper>
      ),
    },
    {
      name: "Location",
      link: "/account/location",
      icon: <FaLocationArrow />,
      content: (
        <AccountWrapper
          loading={loading}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          showButtons={haveInputsChanged}
        >
          <Location values={values} handleSetLocationAttribute={handleSetLocationAttribute} />
        </AccountWrapper>
      ),
    },
    {
      name: "security",
      link: "/account/security",
      icon: <FaShieldAlt />,
      content: (
        <AccountWrapper
          loading={loading}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          showButtons={false}
        >
          <Security
            handleChangePassword={handleChangePassword}
            handleDeleteAccount={handleDeleteAccount}
          />
        </AccountWrapper>
      ),
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="center">
        <Heading size="lg">Account</Heading>
        <Button colorScheme="red" leftIcon={<FaDoorOpen />} onClick={handleSignOut}>
          Sign out
        </Button>
      </Flex>
      <Divider marginY="30px" />
      <Box>
        <VerticalTabs tabs={tabs} />
      </Box>
    </>
  );
}

export default AccountParticipant;
