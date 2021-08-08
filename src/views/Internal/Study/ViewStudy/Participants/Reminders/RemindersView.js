import { Grid } from "@chakra-ui/react";
import NewButton from "molecules/NewButton";

import ReminderCard from "./ReminderCard/ReminderCard";

function RemindersView({ reminders, handleEdit, handleDelete }) {
  return (
    <Grid gap="15px">
      <NewButton onClick={() => handleEdit()}>New Reminder</NewButton>
      {reminders?.map((reminder, i) => (
        <ReminderCard
          key={i}
          reminder={reminder}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </Grid>
  );
}

export default RemindersView;
