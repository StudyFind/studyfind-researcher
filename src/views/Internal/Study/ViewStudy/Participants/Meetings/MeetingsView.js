import React from "react";

import { Grid } from "@chakra-ui/react";

import MeetingsCard from "./MeetingsCard";
import NewCardButton from "../NewCardButton";

function MeetingsView({ meetings, handleEdit }) {
  return (
    <Grid gap="15px">
      <NewCardButton onClick={() => handleEdit()}>New Meeting</NewCardButton>
      {meetings?.map((meeting, i) => (
        <MeetingsCard key={i} meeting={meeting} handleEdit={handleEdit} />
      ))}
    </Grid>
  );
}

export default MeetingsView;
