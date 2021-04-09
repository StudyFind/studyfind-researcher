import React from "react";

import { Flex, Heading } from "@chakra-ui/react";
import ChangeEmailNotifications from "./ChangeEmailNotifications";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

function Settings({ user }) {
  return (
    <>
      <Heading size="lg" mb="25px">
        Settings
      </Heading>
      <Flex gridGap="20px">
        <ChangeEmailNotifications user={user}/>
        <ChangePassword />
        <DeleteAccount />
      </Flex>
    </>
  );
}

export default Settings;
