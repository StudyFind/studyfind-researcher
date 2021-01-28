import React from "react";
import styled from "styled-components";
import { format } from "functions";
import { Heading, Box, Grid, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt, FaExternalLinkAlt, FaPlusCircle } from "react-icons/fa";

function ScheduleView({ schedules, setEdit, goToEdit, handleDelete }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const [hours, minutes] = [date.getHours(), date.getMinutes()];
    const formattedDate = format.date(date);
    const formattedTime = format.time(`${hours}:${minutes}`);
    return `${formattedDate} at ${formattedTime}`;
  };

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
        onClick={() => goToEdit()}
      >
        <Heading size="md" color="gray.500">
          <Flex justify="center" align="center" gridGap="8px">
            <FaPlusCircle />
            Schedule Meeting
          </Flex>
        </Heading>
      </Flex>
      {schedules &&
        schedules.map((schedule, index) => (
          <Box key={index} borderWidth="1px" bg="white" rounded="md" p="15px">
            <Heading size="md">{schedule.name}</Heading>
            <Text color="gray.500" fontSize="0.9rem" mb="8px">
              {formatTimestamp(schedule.time)}
            </Text>
            <ExternalLink href={schedule.link} target="_blank">
              <Flex align="center" gridGap="4px">
                Link to Meeting
                <Text fontSize="0.8rem">
                  <FaExternalLinkAlt />
                </Text>
              </Flex>
            </ExternalLink>
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
              <Text color="gray.500" fontSize="0.9rem" fontStyle="italic"></Text>
            </Flex>
          </Box>
        ))}
    </Grid>
  );
}

const ExternalLink = styled.a`
  color: #3182ce;
  text-decoration: underline;
`;

export default ScheduleView;
