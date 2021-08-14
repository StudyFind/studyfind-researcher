import { Grid } from "@chakra-ui/react";

import AccountHeader from "../AccountHeader";
import { CheckboxInput } from "components";

function Notifications({ inputs, handleSetNotificationsAttribute }) {
  return (
    <Grid gap="20px">
      <AccountHeader
        title="Notification"
        description="The notification section allows you to change what notifications you want to see and where you want to receive them"
      />
      <Grid gap="16px" paddingY="4px" maxW="400px">
        <CheckboxInput
          name="local"
          label="Receive Local Notifications"
          details="Sends notifications in your browser window"
          value={inputs?.notifications?.local}
          onChange={handleSetNotificationsAttribute}
        />
        <CheckboxInput
          name="email"
          label="Receive Email Notifications"
          details={`Sends notifications to your inbox at ${inputs.email}`}
          value={inputs?.notifications?.email}
          onChange={handleSetNotificationsAttribute}
        />
        <CheckboxInput
          name="phone"
          label="Receive Text Notifications"
          details={`Sends notifications to your phone at ${inputs.phone}`}
          value={inputs?.notifications?.phone}
          onChange={handleSetNotificationsAttribute}
        />
      </Grid>
    </Grid>
  );
}

export default Notifications;
