import { Grid, Tooltip, Box } from "@chakra-ui/react";
import { CheckboxInput } from "components";

import AccountWrapper from "../AccountWrapper";
import AccountHeader from "../AccountHeader";
import { auth } from "database/firebase";
import { useContext } from "react";
import { PlanContext } from "context";

function Notifications({
  values,
  showButtons,
  handleCancel,
  handleUpdate,
  handleSetNotificationsAttribute,
}) {
  const plan = useContext(PlanContext);

  return (
    <AccountWrapper
      showButtons={showButtons}
      handleCancel={handleCancel}
      handleUpdate={handleUpdate}
    >
      <Grid gap="20px">
        <AccountHeader
          title="Notifications"
          description="The notification section allows you to change what notifications you want to see and where you want to receive them"
        />
        <Grid gap="16px" paddingY="4px" maxW="400px">
          {/* <CheckboxInput
            name="local"
            label="Receive Local Notifications"
            details="Sends notifications in your browser window"
            value={values?.notifications?.local}
            onChange={handleSetNotificationsAttribute}
          /> */}
          <Tooltip
            label={
              plan !== "PREMIUM" &&
              "Premium subscription required to enable email notifications"
            }
          >
            <Box>
              <CheckboxInput
                name="email"
                label="Receive Email Notifications"
                isDisabled={!values.phone || plan !== "PREMIUM"}
                details={`Sends notifications to your inbox at ${auth.currentUser.email}`}
                value={values?.notifications?.email}
                onChange={handleSetNotificationsAttribute}
              />
            </Box>
          </Tooltip>
          <Tooltip
            label={
              plan !== "PREMIUM"
                ? "Premium subscription required to enable text notifications"
                : values.phone ||
                  "You must provide a valid phone number in the profile section to enable text notifications"
            }
          >
            <Box>
              <CheckboxInput
                name="phone"
                label="Receive Text Notifications"
                isDisabled={!values.phone || plan !== "PREMIUM"}
                details={`Sends notifications to your phone ${
                  values.phone ? `at ${values.phone}` : ""
                }`}
                value={values.phone && values.notifications?.phone}
                onChange={handleSetNotificationsAttribute}
              />
            </Box>
          </Tooltip>
        </Grid>
      </Grid>
    </AccountWrapper>
  );
}

export default Notifications;
