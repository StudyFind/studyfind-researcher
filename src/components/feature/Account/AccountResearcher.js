import { useEffect, useState } from "react";

import VerticalTabs from "components/complex/VerticalTabs/VerticalTabs";

import ProfileResearcher from "components/feature/Account/Profile/ProfileResearcher";
import Notifications from "components/feature/Account/Notifications/Notifications";
import Timezone from "components/feature/Account/Timezone/Timezone";
import Security from "components/feature/Account/Security/Security";

import { Flex, Heading, Button, Divider, Box, useToast } from "@chakra-ui/react";
import { FaDoorOpen, FaUser, FaMapMarkedAlt, FaBell, FaShieldAlt } from "react-icons/fa";

import AccountWrapper from "./AccountWrapper";
import { useDetectDevice } from "hooks";
import { toasts } from "templates";

function AccountResearcher({
  user,
  handleUpdate: handleSave,
  handleSignOut,
  handleChangePassword,
  handleDeleteAccount,
}) {
  const toast = useToast();

  const { isPhone } = useDetectDevice();

  const [values, setValues] = useState(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues(user);
  }, [user]);

  const haveInputsChanged = JSON.stringify(values) !== JSON.stringify(user);

  const handleCancel = () => {
    setValues(user);
  };

  const handleUpdate = () => {
    setLoading(true);
    handleSave(values)
      .then(() => toast(toasts.updatedAccount))
      .catch(() => toast(toasts.connectionError))
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
          <ProfileResearcher
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
      <Flex justify="space-between" align="center" marginBottom={isPhone && "40px"}>
        <Heading size="lg">Account</Heading>
        <Button colorScheme="red" leftIcon={<FaDoorOpen />} onClick={handleSignOut}>
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
