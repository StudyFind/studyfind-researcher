import React from "react";
import styled from "styled-components";

import { Box, Flex, Heading, Text, Icon } from "components";
import { FaCertificate, FaStopwatch, FaUser, FaComment } from "react-icons/fa";

function Notification({ notification }) {
  const icons = {
    milestone: {
      name: FaCertificate,
      color: "green",
    },
    interest: {
      name: FaUser,
      color: "blue",
    },
    reminder: {
      name: FaStopwatch,
      color: "red",
    },
    message: {
      name: FaComment,
      color: "purple",
    },
  };

  function formatDate(value) {
    const date = new Date(value);
    const year = parseInt(date.getYear()) + 1900;
    const month = parseInt(date.getMonth());
    const day = date.getDate();

    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${MONTHS[month]} ${day}, ${year}`;
  }

  const icon = icons[notification.type];

  return (
    <>
      <div>
        <Flex
          w="40px"
          h="40px"
          rounded="full"
          bg={`${icon.color}.100`}
          justify="center"
          align="center"
        >
          <Icon w="16px" h="16px" color={`${icon.color}.300`} as={icon.name} />
        </Flex>
      </div>
      <Box width="100%">
        <Flex justify="space-between" align="center">
          <Heading size="sm">{notification.title}</Heading>
          <Text fontSize="xs" color="gray.400">
            {formatDate(notification.timestamp)}
          </Text>
        </Flex>
        <Text fontSize="md" color="gray.500">
          {notification.description}
        </Text>
      </Box>
    </>
  );
}

export default Notification;
