import React from "react";
import styled from "styled-components";
import { Tag, Button, Text, Box, Grid } from "components";

function RemindView({ participant, setEdit, goToEdit, formatDate, getDaysFromOffsets }) {
  const weekdayAcronyms = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <Grid gap="15px">
      <Button colorScheme="blue" mr={3} onClick={() => setEdit(true)}>
        Create New Reminder
      </Button>
      {participant.reminders &&
        participant.reminders.map((reminder, index) => (
          <Box
            borderWidth="1px"
            bg="white"
            rounded="md"
            p="10px"
            key={index}
            onClick={() => goToEdit(index)}
          >
            <Text fontWeight="600" color="black">
              {reminder.title}
            </Text>
            <Row>
              <Text color="gray.600" fontSize="xs">
                {`${formatDate(reminder.startDate)} to ${formatDate(reminder.endDate)}`}
              </Text>
              <Tag colorScheme="green" fontSize="xs">
                {getDaysFromOffsets(reminder.times).map((value, index) => (
                  <span key={index}>{value && weekdayAcronyms[index]}</span>
                ))}
              </Tag>
            </Row>
          </Box>
        ))}
    </Grid>
  );
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export default RemindView;
