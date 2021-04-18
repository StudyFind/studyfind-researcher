import React from "react";

import { Grid } from "@chakra-ui/react";

import MeetingsItem from "./MeetingsItem";

function MeetingsList({ meetings }) {
  return (
    <Grid gridGap="10px" py="10px">
      {meetings.map((meeting, index) => (
        <MeetingsItem key={index} meeting={meeting} />
      ))}
    </Grid>
  );
}

export default MeetingsList;
