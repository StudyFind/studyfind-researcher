import React from "react";
import styled from "styled-components";
import {
  Heading,
  Box,
  Grid,
  Flex,
  IconButton,
  Button,
  Text,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function RemindView({
  participant,
  setEdit,
  goToEdit,
  formatDate,
  getDaysFromOffsets,
  getTimesFromOffsets,
  handleDelete,
}) {
  const weekdayAcronyms = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Grid gap="15px">
      <Button colorScheme="blue" mr={3} onClick={() => setEdit(true)}>
        Create New Reminder
      </Button>
      {participant.reminders &&
        participant.reminders.map((reminder, index) => (
          <Box key={index} borderWidth="1px" bg="white" rounded="md" p="15px">
            <Heading size="md" mb="8px">
              {reminder.title}
            </Heading>
            <Weekdays>
              {getDaysFromOffsets(reminder.times).map((value, index) => (
                <Tag
                  key={index}
                  color={value ? "white" : "gray.500"}
                  bg={value ? "blue.500" : "gray.100"}
                >
                  {weekdayAcronyms[index]}
                </Tag>
              ))}
            </Weekdays>
            <Flex gridGap="8px" my="8px">
              {getTimesFromOffsets(reminder.times).map((time, index) => (
                <Tag key={index} colorScheme="blue">
                  <TagLabel>{time}</TagLabel>
                </Tag>
              ))}
            </Flex>
            <Text fontStyle="italic" color="gray.500" fontSize="0.9rem">
              {formatDate(reminder.startDate)} to {formatDate(reminder.endDate)}
            </Text>
            <Flex justify="space-between" align="center" mt="16px">
              <Flex gridGap="4px">
                <IconButton
                  icon={<FaPencilAlt />}
                  size="sm"
                  color="blue.500"
                  bg="blue.100"
                  onClick={() => goToEdit(index)}
                />
                <IconButton
                  icon={<FaTrashAlt />}
                  size="sm"
                  color="red.500"
                  bg="red.100"
                  onClick={() => handleDelete(index)}
                />
              </Flex>
              <Text
                color="gray.500"
                fontSize="0.9rem"
                fontStyle="italic"
              ></Text>
            </Flex>
          </Box>
        ))}
    </Grid>
  );
}

const Weekdays = styled(Flex)`
  & > span {
    border-radius: 0;
    margin-left: -1px;

    &:first-child {
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }

    &:last-child {
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
  }
`;

export default RemindView;
