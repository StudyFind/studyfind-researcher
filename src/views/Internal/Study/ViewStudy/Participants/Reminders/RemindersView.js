import React from "react";
import moment from "moment";
import styled from "styled-components";
import {
  Heading,
  Box,
  Grid,
  Flex,
  Tooltip,
  IconButton,
  Text,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

import {
  FaPencilAlt,
  FaTrashAlt,
  FaCheckCircle,
  FaPlusCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function RemindersView({
  reminders,
  setEdit,
  goToEdit,
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
              {moment(reminder.startDate).format("LL")} to {moment(reminder.endDate).format("LL")}
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
                  <TagLabel>{moment(time, ["HH:mm"]).format("hh:mma")}</TagLabel>
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
                  _hover={{ bg: "blue.200" }}
                  onClick={() => goToEdit(reminder)}
                />
                <IconButton
                  icon={<FaTrashAlt />}
                  size="sm"
                  color="red.500"
                  bg="red.100"
                  _hover={{ bg: "red.200" }}
                  onClick={() => handleDelete(reminder)}
                />
              </Flex>
              {reminder.confirmedByParticipant ? (
                <Tooltip label="Participant has confirmed">
                  <Flex
                    cursor="default"
                    fontSize="14px"
                    fontWeight="600"
                    rounded="md"
                    color="green.500"
                    borderWidth="1px"
                    borderColor="green.300"
                    align="center"
                    px="12px"
                    h="32px"
                    gridGap="8px"
                  >
                    <FaCheckCircle />
                    Confirmed
                  </Flex>
                </Tooltip>
              ) : (
                <Tooltip label="Waiting for participant to confirm">
                  <Flex
                    cursor="default"
                    fontSize="14px"
                    fontWeight="600"
                    rounded="md"
                    color="gray.500"
                    borderWidth="1px"
                    borderColor="gray.300"
                    align="center"
                    px="12px"
                    h="32px"
                    gridGap="8px"
                  >
                    <FaExclamationCircle />
                    Pending
                  </Flex>
                </Tooltip>
              )}
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

export default RemindersView;
