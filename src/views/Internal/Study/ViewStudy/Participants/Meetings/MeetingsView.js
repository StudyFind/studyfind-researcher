import React from "react";

import { Grid } from "@chakra-ui/react";

import MeetingsCard from "./MeetingsCard";
import NewCardButton from "../NewCardButton";

function MeetingsView({ meetings, handleEdit }) {
  return (
    <Grid gap="15px">
      <NewCardButton onClick={() => handleEdit()}>New Meeting</NewCardButton>
      {meetings?.map((meeting) => (
        <MeetingsCard key={meeting.id} meeting={meeting} handleEdit={handleEdit} />
      ))}
    </Grid>
  );
}

export default MeetingsView;
