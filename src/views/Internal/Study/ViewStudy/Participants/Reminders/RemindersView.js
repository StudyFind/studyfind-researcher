import { Heading, Grid, Flex } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

import RemindersCard from "./RemindersCard";

function RemindersView({ reminders, handleEdit }) {
  return (
    <Grid gap="15px">
      <Flex
        h="136px"
        rounded="md"
        borderWidth="1px"
        borderColor="gray.300"
        borderStyle="dashed"
        bg="gray.100"
        justify="center"
        align="center"
        cursor="pointer"
        onClick={() => handleEdit()}
      >
        <Heading size="md" color="gray.500">
          <Flex justify="center" align="center" gridGap="8px">
            <FaPlusCircle />
            New Reminder
          </Flex>
        </Heading>
      </Flex>
      {reminders &&
        reminders.map((reminder, i) => (
          <RemindersCard key={i} reminder={reminder} handleEdit={handleEdit} />
        ))}
    </Grid>
  );
}

export default RemindersView;
