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

function ScheduleView({
  schedules,
  setEdit,
  goToEdit,
  formatDate,
  getDaysFromOffsets,
  getTimeFromOffset,
  handleDelete,
}) {
  return (
    <Grid gap="15px">
      <Button colorScheme="blue" mr={3} onClick={() => setEdit(true)}>
        Create New Schedule
      </Button>
      {schedules &&
        schedules.map((schedule, index) => (
          <Box key={index} borderWidth="1px" bg="white" rounded="md" p="15px">
            <Heading size="md" mb="8px">
              {schedule.name}
            </Heading>
            <Flex gridGap="8px" my="8px">
              <Text fontStyle="italic" color="gray.500" fontSize="0.9rem">
                {formatDate(schedule.date)}
              </Text>
              <Text fontStyle="italic" color="gray.500" fontSize="0.9rem">
                {getTimeFromOffset(schedule.time)}
              </Text>
            </Flex>
            <Text fontStyle="italic" color="gray.500" fontSize="0.9rem">
              {schedule.link}
            </Text>
            <Flex justify="space-between" align="center" mt="16px">
              <Flex gridGap="4px">
                <IconButton
                  icon={<FaPencilAlt />}
                  size="sm"
                  color="blue.500"
                  bg="blue.100"
                  onClick={() => goToEdit(schedule)}
                />
                <IconButton
                  icon={<FaTrashAlt />}
                  size="sm"
                  color="red.500"
                  bg="red.100"
                  onClick={() => handleDelete(schedule)}
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

export default ScheduleView;
