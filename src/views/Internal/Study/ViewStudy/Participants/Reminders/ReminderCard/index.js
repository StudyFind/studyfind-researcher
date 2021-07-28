import { helpers } from "functions";
import { firestore } from "database/firebase";

import { Heading, Box, Flex } from "@chakra-ui/react";

import ReminderWeekdays from "./ReminderWeekdays";
import ReminderTimes from "./ReminderTimes";
import ReminderConfirmation from "./ReminderConfirmation";
import ReminderButtons from "./ReminderButtons";
import ReminderDateRange from "./ReminderDateRange";

function RemindersCard({ reminder, handleEdit }) {
  const handleDelete = () => {
    firestore.collection("reminders").doc(reminder.id).delete();
  };

  const [weekdays, times] = helpers.convertOffsetsToWeekdaysAndTimes(reminder.times);

  return (
    <Box key={reminder.id} borderWidth="1px" bg="white" rounded="md" p="15px">
      <Heading size="md">{reminder.title}</Heading>
      <ReminderDateRange startDate={reminder.startDate} endDate={reminder.endDate} />
      <ReminderWeekdays weekdays={weekdays} />
      <ReminderTimes times={times} />
      <Flex justify="space-between" align="center" mt="16px">
        <ReminderButtons handleEdit={handleEdit} handleDelete={handleDelete} />
        <ReminderConfirmation confirmedByParticipant={reminder.confirmedByParticipant} />
      </Flex>
    </Box>
  );
}

export default RemindersCard;
