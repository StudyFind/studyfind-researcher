import { useState, useEffect, useContext } from "react";
import { useCredentials, useDetectDevice } from "hooks";
import { UserContext } from "context";
import { toasts } from "templates";
import { researcher } from "database/mutations";
import { changePassword, deleteAccount, signout } from "database/auth";

import { Flex, Heading, Button, Divider, Box, useToast } from "@chakra-ui/react";
import { FaDoorOpen, FaUser, FaMapMarkedAlt, FaBell, FaShieldAlt } from "react-icons/fa";

import VerticalTabs from "components/complex/VerticalTabs/VerticalTabs";
import AccountWrapper from "components/feature/Account/AccountWrapper";

import ProfileResearcher from "components/feature/Account/Profile/ProfileResearcher";
import Notifications from "components/feature/Account/Notifications/Notifications";
import Timezone from "components/feature/Account/Timezone/Timezone";
import Security from "components/feature/Account/Security/Security";

function Account() {
  const { uid } = useCredentials();
  const user = useContext(UserContext);

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

    return researcher
      .update(uid, values)
      .then(() => toast(toasts.updatedAccount))
      .catch(() => toast(toasts.connectionError))
      .finally(() => setLoading(false));
  };

  const handleChangePassword = (values) => {
    setLoading(true);

    return changePassword(values)
      .then(() => toast(toasts.changedPassword))
      .catch(() => toast(toasts.connectionError))
      .finally(() => setLoading(false));
  };

  const handleDeleteAccount = (values) => {
    setLoading(true);

    return deleteAccount(values)
      .then(() => toast(toasts.deletedAccount))
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
        <Button colorScheme="red" leftIcon={<FaDoorOpen />} onClick={signout}>
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

export default Account;
