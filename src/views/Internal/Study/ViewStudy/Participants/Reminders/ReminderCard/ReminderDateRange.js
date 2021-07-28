import moment from "moment";
import { Text } from "@chakra-ui/react";

function ReminderDateRange({ startDate, endDate }) {
  const formattedStartDate = moment(startDate).format("LL");
  const formattedEndDate = moment(endDate).format("LL");

  return (
    <Text color="gray.500" fontSize="0.9rem" mb="8px">
      {formattedStartDate} to {formattedEndDate}
    </Text>
  );
}

export default ReminderDateRange;
