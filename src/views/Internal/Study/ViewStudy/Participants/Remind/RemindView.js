import React from "react";
import { Tag, Button, Heading, Text, Box, Flex, Grid } from "components";
import { compute } from "functions";
import styled from "styled-components";

function RemindView({ participant,setEdit }) {
  return (
    <Grid gap="15px">
      <Button colorScheme="blue" mr={3} onClick={() => setEdit(true)}>
        Create New
      </Button>
      {participant.reminders &&
        participant.reminders.map((reminder, index) => (
          <Box borderWidth="1px" bg="white" rounded="md" p="10px" key={index}>
            <Text fontWeight="600" color="black">
              {reminder.title}
            </Text>
            <Row>
              <Text color="gray.600" fontSize="xs">
                {startAndEndDate(reminder)}
              </Text>
              <Tag colorScheme="green" fontSize="xs">
                {checkRepeat(reminder)}
              </Tag>
            </Row>
          </Box>
        ))}
    </Grid>
  );
}
function startAndEndDate(reminder) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[reminder.startDate.toDate().getMonth()]}-${reminder.startDate.toDate().getDate()}-${reminder.startDate.toDate().getFullYear()} to ${months[reminder.endDate.toDate().getMonth()]}-${reminder.endDate.toDate().getDate()}-${reminder.endDate.toDate().getFullYear()}`
}
function checkRepeat(reminder) {
  var repeat = " "
  const weekday = ['U', 'M', 'T', 'W', 'R', 'F', 'S']
  var weekdayBoolean = [false, false, false, false, false, false, false]
  for (var time in reminder.times) {
    var offset_time = convertMsToHour(reminder.times[time])
    console.log(offset_time)
    weekdayBoolean[Math.floor(offset_time.hour/24)] = true
    
  }
  for (const i in weekdayBoolean) {
    if (weekdayBoolean[i]) {
      repeat = repeat + weekday[i]
    } 
  }
  return repeat

}
function convertMsToHour(ms) {
  const second = ms/1000 % 60
  const minute = (ms/1000 - second) / 60 % 60
  const hour = (ms/1000 - minute * 60 - second) / 3600
  return {hour, minute, second};
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;
export default RemindView;