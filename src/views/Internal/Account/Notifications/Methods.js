import React from "react";

import { auth } from "database/firebase";
import { Grid } from "@chakra-ui/react";

import AccountSubHeader from "../AccountSubHeader";
import AccountCheckbox from "../AccountCheckbox";

function Methods({ notifications, handleNotifications }) {
  return (
    <Grid gap="8px">
      <AccountSubHeader
        subtitle="Methods"
        subdescription="Where you want to receive your notifications"
      />
      <Grid gap="4px">
        <AccountCheckbox
          title="Receive Email Notifications"
          description={`Sends notifications to your inbox at ${auth.currentUser.email}`}
          name="email"
          value={notifications.email}
          onChange={handleNotifications}
        />
        <AccountCheckbox
          title="Receive Website Notifications"
          description="Shows notifications to you while you're logged into your account"
          name="toast"
          value={notifications.toast}
          onChange={handleNotifications}
        />
      </Grid>
    </Grid>
  );
}

export default Methods;
