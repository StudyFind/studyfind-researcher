import { useState, useEffect, useContext } from "react";
import { useUserData } from "hooks";
import { UserContext } from "context";

import { auth } from "database/firebase";
import { researcher } from "database/mutations";
import { changePassword, deleteAccount, signout } from "database/auth";

import { FaUser, FaMapMarkedAlt, FaBell, FaShieldAlt } from "react-icons/fa";

import ProfileResearcher from "components/feature/AccountTabs/Profile/ProfileResearcher";
import Notifications from "components/feature/AccountTabs/Notifications/Notifications";
import Timezone from "components/feature/AccountTabs/Timezone/Timezone";
import Security from "components/feature/AccountTabs/Security/Security";
import AccountTabs from "components/feature/AccountTabs/AccountTabs";

function Account() {
  const { uid } = useUserData(auth);

  const user = useContext(UserContext);
  const [values, setValues] = useState(user);

  const haveInputsChanged = JSON.stringify(values) !== JSON.stringify(user);

  useEffect(() => {
    setValues(user);
  }, [user]);

  const handleCancel = () => {
    setValues(user);
  };

  const handleUpdate = () => {
    return researcher.update(uid, values);
  };

  const handleSetProfileAttribute = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSetSubAttribute = (parent, name, value) => {
    setValues((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }));
  };

  const handleSetNotificationsAttribute = (name, value) => {
    handleSetSubAttribute("notifications", name, value);
  };

  const handleSetTimezoneAttribute = (name, value) => {
    handleSetSubAttribute("timezone", name, value);
  };

  const tabs = [
    {
      name: "Profile",
      link: "/account/profile",
      icon: <FaUser />,
      content: (
        <ProfileResearcher
          values={values}
          showButtons={haveInputsChanged}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          handleSetProfileAttribute={handleSetProfileAttribute}
        />
      ),
    },
    {
      name: "Notifications",
      link: "/account/notifications",
      icon: <FaBell />,
      content: (
        <Notifications
          values={values}
          showButtons={haveInputsChanged}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          handleSetNotificationsAttribute={handleSetNotificationsAttribute}
        />
      ),
    },
    {
      name: "Timezone",
      link: "/account/timezone",
      icon: <FaMapMarkedAlt />,
      content: (
        <Timezone
          values={values}
          showButtons={haveInputsChanged}
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          handleSetTimezoneAttribute={handleSetTimezoneAttribute}
        />
      ),
    },
    {
      name: "Security",
      link: "/account/security",
      icon: <FaShieldAlt />,
      content: (
        <Security
          showButtons={false}
          handleChangePassword={changePassword}
          handleDeleteAccount={deleteAccount}
        />
      ),
    },
  ];

  return (
    <>
      <AccountTabs tabs={tabs} handleSignout={signout} />
    </>
  );
}

export default Account;
