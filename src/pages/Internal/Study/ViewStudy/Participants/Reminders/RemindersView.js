import { useContext } from "react";

import { RemindersContext } from "./RemindersContext";

import { Grid } from "@chakra-ui/react";
import { LoadMoreButton, NewCardButton } from "components";

import ReminderCardResearcher from "components/feature/Participants/ReminderCard/ReminderCardResearcher";

function RemindersView() {
  const {
    reminders,
    hasFetchedAll,
    isFetchingMore,
    handleFetchMore,
    handleDelete,
    handleEdit,
  } = useContext(RemindersContext);

  return (
    <Grid gap="15px" padding="20px" alignItems="center">
      <NewCardButton onClick={() => handleEdit()}>New Reminder</NewCardButton>
      {reminders?.map((reminder) => (
        <ReminderCardResearcher
          key={reminder.id}
          reminder={reminder}
          handleEdit={() => handleEdit(reminder)}
          handleDelete={() => handleDelete(reminder)}
        />
      ))}
      <LoadMoreButton
        fetchedAll={hasFetchedAll}
        isLoading={isFetchingMore}
        onClick={handleFetchMore}
      />
    </Grid>
  );
}

export default RemindersView;
