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
import { FaPlusCircle } from "react-icons/fa";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function RemindView({
  reminders,
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
        onClick={() => setEdit(true)}
      >
        <Heading size="md" color="gray.500">
          <Flex justify="center" align="center" gridGap="8px">
            <FaPlusCircle />
            New Reminder
          </Flex>
        </Heading>
      </Flex>
      {reminders &&
        reminders.map((reminder, index) => (
          <Box key={index} borderWidth="1px" bg="white" rounded="md" p="15px">
            <Heading size="md">{reminder.title}</Heading>
            <Text color="gray.500" fontSize="0.9rem" mb="8px">
              {formatDate(reminder.startDate)} to {formatDate(reminder.endDate)}
            </Text>
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
            <Flex justify="space-between" align="center" mt="16px">
              <Flex gridGap="4px">
                <IconButton
                  icon={<FaPencilAlt />}
                  size="sm"
                  color="blue.500"
                  bg="blue.100"
                  onClick={() => goToEdit(reminder)}
                />
                <IconButton
                  icon={<FaTrashAlt />}
                  size="sm"
                  color="red.500"
                  bg="red.100"
                  onClick={() => handleDelete(reminder)}
                />
              </Flex>
              <Text color="gray.500" fontSize="0.9rem" fontStyle="italic"></Text>
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
