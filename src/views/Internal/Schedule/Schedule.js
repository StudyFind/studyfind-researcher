import React, { useState } from "react";
import moment from "moment";
import { format } from "functions";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import Calendar from "./Calendar/Calendar";
import Meetings from "./Meetings/Meetings";

function Schedule() {
  const today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);

  return (
    <Grid gap="50px" templateColumns="300px 1fr">
      <Calendar today={today} date={date} setDate={setDate} />
      <Box>
        <Heading size="lg">Meetings</Heading>
        <Text color="gray.500">{format.date(date)}</Text>
        <Meetings date={date} />
      </Box>
    </Grid>
  );
}

export default Schedule;
