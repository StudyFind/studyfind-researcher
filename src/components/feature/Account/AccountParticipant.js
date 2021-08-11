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
  const [inputs, setInputs] = useState(user);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const haveInputsChanged = JSON.stringify(inputs) !== JSON.stringify(user);

  const handleCancel = () => {
    setInputs(user);
  };

  const handleUpdate = () => {
    setLoading(true);
    handleSave()
      .then(() => {})
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const handleSetProfileAttribute = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetNotificationsAttribute = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: value,
      },
    }));
  };

  const handleSetLocationAttribute = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleSetTimezoneAttribute = (name, value) => {
    setInputs((prev) => ({
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
            inputs={inputs}
            errors={errors}
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
            inputs={inputs}
            errors={errors}
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
          <Timezone
            inputs={inputs}
            errors={errors}
            handleSetTimezoneAttribute={handleSetTimezoneAttribute}
          />
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
          <Location
            inputs={inputs}
            errors={errors}
            handleSetLocationAttribute={handleSetLocationAttribute}
          />
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
        <Button
          colorScheme="red"
          leftIcon={<FaDoorOpen />}
          onClick={handleSignOut}
        >
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
