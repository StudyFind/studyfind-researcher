import React, { useState, useEffect } from "react";
import moment from "moment";

import { auth, firestore } from "database/firebase";

import { Box, Flex, Tooltip, Text, Icon } from "@chakra-ui/react";
import { FaCertificate, FaStopwatch, FaUser, FaComment } from "react-icons/fa";

function Notification({ notification }) {
  const [read] = useState(notification.read);
  /* ^^
    done to save original value of notification.read when the component first rendered

    the purpose is to save the original read state of the notification even though read
    is changed from false to true in the useEffect below

    the notification prop is attached to a firebase realtime listener hook which will change
    the value of notification.read as soon as its updated

    this update would change the blue "unread" background to the white "background" almost
    immediately without conveying to the user that this is a new notification

    the blue background would've disappeared the next time the component is loaded as the
    original notification.read value would be true when the component first renders
  */

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

  const icon = icons[notification.type] || icons["interest"];

  return (
    <Flex align="center" w="100%" p="12px" gridGap="10px" bg={read ? "white" : "blue.50"}>
      <Flex
        w="40px"
        h="40px"
        bg={`${icon.color}.100`}
        justify="center"
        align="center"
        rounded="full"
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
    </Flex>
  );
}

export default Notification;
