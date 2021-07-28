import { Grid } from "@chakra-ui/react";
import NewButton from "molecules/NewButton";

import ReminderCard from "./ReminderCard";

function RemindersView({ reminders, handleEdit }) {
  return (
    <Grid gap="15px">
      <NewButton onClick={() => handleEdit()}>New Reminder</NewButton>
      {reminders?.map((reminder, i) => (
        <ReminderCard key={i} reminder={reminder} handleEdit={handleEdit} />
      ))}
    </Grid>
  );
}

export default RemindersView;
