import React, { useState } from "react";
import moment from "moment";
import { datetime } from "functions";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import Calendar from "./Calendar/Calendar";
import Meetings from "./Meetings/Meetings";

function Schedule() {
  const today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);

  const displayDate = datetime.getFriendlyDate(date);

  return (
    <Grid gap="50px" templateColumns="1fr 300px">
      <Box>
        <Heading size="lg">Meetings</Heading>
        <Text color="gray.500">{displayDate}</Text>
        <Meetings date={date} />
      </Box>
      <Calendar today={today} date={date} setDate={setDate} />
    </Grid>
  );
}

export default Schedule;
