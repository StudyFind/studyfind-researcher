import { useState, useContext } from "react";
import { StripeContext } from "context";
import moment from "moment";
import { datetime } from "functions";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import Calendar from "./Calendar/Calendar";
import Meetings from "./Meetings/Meetings";

function Schedule() {
  const today = moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(today);

  const userStripeRole = useContext(StripeContext);

  const displayDate = datetime.getFriendlyDate(date);

  return (
    
    <Grid gap="50px" templateColumns="1fr 300px">
        {(userStripeRole === 'premium') ? (
        <>
          <Box>
            <Heading size="lg">Meetings</Heading>
            <Text color="gray.500">{displayDate}</Text>
            <Meetings date={date} />
          </Box>
          <Calendar today={today} date={date} setDate={setDate} />
        </>
        ) : (
        <Box>
          <Heading size="lg">Scheduling is a Premium Feature!</Heading>
          <Text color="blue.500"><a href="/pricing">Click Here to Subscribe for Premium</a></Text>
        </Box>
        )}
    </Grid>
  );
}

export default Schedule;
