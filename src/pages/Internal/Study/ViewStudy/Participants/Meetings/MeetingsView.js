import { Grid } from "@chakra-ui/react";
import { NewCardButton } from "components";

import MeetingCard from "components/feature/MeetingCard/MeetingCard";

function MeetingsView({ meetings, handleEdit, handleDelete }) {
  return (
    <Grid gap="15px" padding="20px">
      <NewCardButton onClick={() => handleEdit()}>New Meeting</NewCardButton>
      {meetings?.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </Grid>
  );
}

export default MeetingsView;
