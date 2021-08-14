import { useState } from "react";

import VerticalTabs from "components/complex/VerticalTabs/VerticalTabs";

import ProfileResearcher from "components/feature/Account/Profile/ProfileResearcher";
import Notifications from "components/feature/Account/Notifications/Notifications";
import Timezone from "components/feature/Account/Timezone/Timezone";
import Security from "components/feature/Account/Security/Security";

import { Flex, Heading, Button, Divider, Box } from "@chakra-ui/react";
import {
  FaDoorOpen,
  FaUser,
  FaMapMarkedAlt,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";

import AccountWrapper from "./AccountWrapper";
import { useDetectDevice } from "hooks";

function AccountResearcher({
  user,
  handleUpdate: handleSave,
  handleSignOut,
  handleChangePassword,
  handleDeleteAccount,
}) {
  const { isPhone } = useDetectDevice();

  const [inputs, setInputs] = useState(user);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const haveInputsChanged = JSON.stringify(inputs) !== JSON.stringify(user);

  const handleCancel = () => {
    setInputs(user);
  };

  const handleUpdate = () => {
    setLoading(true);
    handleSave(inputs)
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
          <ProfileResearcher
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
      name: "Security",
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
      <Flex
        justify="space-between"
        align="center"
        marginBottom={isPhone && "40px"}
      >
        <Heading size="lg">Account</Heading>
        <Button
          colorScheme="red"
          leftIcon={<FaDoorOpen />}
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </Flex>
      {isPhone || <Divider marginY="30px" />}
      <Box>
        <VerticalTabs tabs={tabs} />
      </Box>
    </>
  );
}

export default AccountResearcher;
