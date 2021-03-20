import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";

import { auth, firestore } from "database/firebase";

import { Box, Flex, Tooltip, Text, Icon } from "@chakra-ui/react";
import { FaCertificate, FaStopwatch, FaUser, FaComment } from "react-icons/fa";

function Notification({ notification }) {
  const [read] = useState(notification.read);

  useEffect(() => {
    if (!read) {
      firestore
        .collection("researchers")
        .doc(auth.currentUser.uid)
        .collection("notifications")
        .doc(notification.id)
        .update({ read: true });
    }
  }, []);

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

  const icon = icons[notification.type];

  return (
    <Row bg={read ? "white" : "blue.50"}>
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
      <Box width="100%" ml="4px">
        <Flex justify="space-between" align="center">
          <Text size="sm" fontWeight="600">
            {notification.title}
          </Text>
          <Tooltip label={moment(notification.time).format("LL")}>
            <Text cursor="pointer" fontSize="12px" color="gray.400">
              {moment(notification.time).fromNow()}
            </Text>
          </Tooltip>
        </Flex>
        <Text fontSize="sm" color="gray.500">
          {notification.description}
        </Text>
      </Box>
    </Row>
  );
}

const Row = styled(Box)`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: 15px;

  &:first-child {
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
  }

  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }
`;

export default Notification;
