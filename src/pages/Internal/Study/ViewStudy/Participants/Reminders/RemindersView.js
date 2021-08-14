import { Grid } from "@chakra-ui/react";
import { NewCardButton } from "components";

import ReminderCard from "components/feature/ReminderCard/ReminderCard";

function RemindersView({ reminders, handleEdit, handleDelete }) {
  return (
    <Grid gap="15px" padding="20px">
      <NewCardButton onClick={() => handleEdit()}>New Reminder</NewCardButton>
      {reminders?.map((reminder) => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </Grid>
  );
}

export default RemindersView;
