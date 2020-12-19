import React from "react";
import { Tag, Button, Heading, Text, Box, Flex, Grid } from "components";
import { compute } from "functions";
import styled from "styled-components";

function RemindView({ reminders,setEdit }) {
  return (
    <Grid gap="15px">
      <Button colorScheme="blue" mr={3} onClick={() => setEdit(true)}>
        Create New
      </Button>
      {reminders &&
        reminders.map((reminder, index) => (
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
  return `${months[reminder.startDate.toDate().getMonth() - 1]}-${reminder.startDate.toDate().getDate()}-${reminder.startDate.toDate().getFullYear()} to ${months[reminder.endDate.toDate().getMonth() - 1]}-${reminder.endDate.toDate().getDate()}-${reminder.endDate.toDate().getFullYear()}`
}
function checkRepeat(reminder) {
  var repeat = " "
  var time
  const weekday = ['U', 'M', 'T', 'W', 'R', 'F', 'S']
  for (time in reminder.times) {
    var offset_time = convertMsToHour(reminder.times[0])
    repeat = repeat + weekday[Math.floor(offset_time.hour/24)]
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