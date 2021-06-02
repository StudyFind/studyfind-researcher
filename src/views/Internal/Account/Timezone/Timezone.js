import React from "react";
import moment from "moment-timezone";

import { Box, Grid, Tooltip } from "@chakra-ui/react";
import { SelectInput } from "components";

import AccountHeader from "../AccountHeader";
import AccountCheckbox from "../AccountCheckbox";

function Timezone({ inputs, handleChange, handlePreferences }) {
  return (
    <>
      <AccountHeader
        title="Timezone"
        description="We use the selected timezone to display your meeting times and notifications"
      />
      <Grid gap="25px">
        <AccountCheckbox
          name="autodetectTimezone"
          title="Auto Detect Timezone"
          description="Automatically detects and updates your local timezone each time you use StudyFind"
          value={inputs.preferences.timezone.autodetect}
          onChange={handlePreferences}
        />
        <Tooltip
          label={
            inputs.preferences.timezone.autodetect &&
            "Disable Auto Detect Timezone by unchecking the box above to manually enter your preferred timezone"
          }
        >
          <Box>
            <SelectInput
              label="Timezone Location"
              name="timezone"
              options={moment.tz.zonesForCountry("US")}
              value={inputs.timezone}
              onChange={handleChange}
              isDisabled={inputs.preferences.timezone.autodetect}
            />
          </Box>
        </Tooltip>
      </Grid>
    </>
  );
}

export default Timezone;
