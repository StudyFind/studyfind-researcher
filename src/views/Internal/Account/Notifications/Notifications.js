import React from "react";

import { auth } from "database/firebase";
import { Grid } from "@chakra-ui/react";

import AccountHeader from "../AccountHeader";
import AccountToggle from "../AccountToggle";
import AccountCheckbox from "../AccountCheckbox";

function Notifications({ inputs, handleNotifications, handleCategories }) {
  return (
    <>
      <Grid gap="10px">
        <AccountHeader
          title="Notification"
          description="SelectInput what notifications you want to recieve and where you want to recieve them"
        />
        <Grid gap="4px">
          <AccountToggle
            label="Account"
            name="account"
            value={inputs.notifications.categories.account}
            onChange={handleCategories}
          />
          <AccountToggle
            label="Studies"
            name="studies"
            value={inputs.notifications.categories.studies}
            onChange={handleCategories}
          />
          <AccountToggle
            label="Participants"
            name="participants"
            value={inputs.notifications.categories.participants}
            onChange={handleCategories}
          />
          <AccountToggle
            label="Meetings"
            name="meetings"
            value={inputs.notifications.categories.meetings}
            onChange={handleCategories}
          />
        </Grid>
      </Grid>
      <AccountCheckbox
        title="Receive Email Notifications"
        description={`Sends notifications to your inbox at ${auth.currentUser.email}`}
        name="email"
        value={inputs.notifications.email}
        onChange={handleNotifications}
      />
    </>
  );
}

export default Notifications;
