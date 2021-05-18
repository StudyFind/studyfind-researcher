import React from "react";
import moment from "moment";
import styled from "styled-components";

import { helpers } from "functions";
import { firestore } from "database/firebase";

import { Heading, Box, Flex, Tooltip, Text, Tag, TagLabel } from "@chakra-ui/react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import RemindersButtons from "./RemindersButtons";

function RemindersCard({ reminder, handleEdit }) {
  const weekdayAcronyms = ["S", "M", "T", "W", "T", "F", "S"];

  const handleDelete = () => {
    firestore.collection("reminders").doc(reminder.id).delete();
  };

  const [weekdays, times] = helpers.convertOffsetsToWeekdaysAndTimes(reminder.times);

  return (
    <Box key={reminder.id} borderWidth="1px" bg="white" rounded="md" p="15px">
      <Heading size="md">{reminder.title}</Heading>
      <Text color="gray.500" fontSize="0.9rem" mb="8px">
        {moment(reminder.startDate).format("LL")} to {moment(reminder.endDate).format("LL")}
      </Text>
      <Weekdays>
        {weekdays.map((value, i) => (
          <Tag key={i} color={value ? "white" : "gray.500"} bg={value ? "blue.500" : "gray.100"}>
            {weekdayAcronyms[i]}
          </Tag>
        ))}
      </Weekdays>
      <Flex gridGap="8px" my="8px">
        {times.map((time) => (
          <Tag key={time.id} colorScheme="blue">
            <TagLabel>{moment(time, ["HH:mm"]).format("hh:mma")}</TagLabel>
          </Tag>
        ))}
      </Flex>
      <Flex justify="space-between" align="center" mt="16px">
        <RemindersButtons handleEdit={handleEdit} handleDelete={handleDelete} />
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

export default RemindersCard;
