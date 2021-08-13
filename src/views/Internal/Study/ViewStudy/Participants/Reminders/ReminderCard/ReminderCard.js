import { Heading, Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { helpers } from "utils";

import ReminderStatus from "./ReminderStatus";
import ReminderButtons from "./ReminderButtons";
import ReminderWeekdays from "./ReminderWeekdays";
import ReminderTimes from "./ReminderTimes";
import ReminderDates from "./ReminderDates";

function RemindersCard({ reminder, handleEdit, handleDelete }) {
  const [weekdays, times] = helpers.convertOffsetsToWeekdaysAndTimes(reminder.times);

  const background = useColorModeValue("white", "gray.900");

  return (
    <Box borderWidth="1px" background={background} rounded="md" p="15px" width="100%">
      <Heading size="md">{reminder.title}</Heading>
      <ReminderDates startDate={reminder.startDate} endDate={reminder.endDate} />
      <ReminderWeekdays weekdays={weekdays} />
      <ReminderTimes times={times} />
      <Flex justify="space-between" align="center" mt="16px">
        <ReminderButtons
          handleEdit={() => handleEdit(reminder)}
          handleDelete={() => handleDelete(reminder.id)}
        />
        <ReminderStatus confirmed={reminder.confirmedByParticipant} />
      </Flex>
    </Box>
  );
}

export default RemindersCard;
