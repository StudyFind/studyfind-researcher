import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import { UserContext } from "context";
import { auth, firestore } from "database/firebase";
import { notifications } from "templates";

import { Link } from "react-router-dom";
import { Box, Flex, Tooltip, Text, Icon } from "@chakra-ui/react";

function Notification({ notification }) {
  const [read] = useState(notification.read);
  const { timezone } = useContext(UserContext);
  /*
    ^^^^^
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

  const getTemplate = (type, meta) => {
    const generateTemplate = notifications[type] || notifications["defaultTemplate"];
    return generateTemplate(meta);
  };

  const { type, meta, time } = notification;
  const { title, description, color, icon, link } = getTemplate(type, meta);

  const localTime = moment.utc(time).tz(timezone);

  return (
    <Link to={link}>
      <Flex align="center" w="100%" p="12px" gridGap="10px" bg={read ? "white" : "blue.50"}>
        <Flex w="40px" h="40px" bg={`${color}.100`} justify="center" align="center" rounded="full">
          <Icon w="16px" h="16px" color={`${color}.300`} as={icon} />
        </Flex>
        <Box width="100%" ml="4px">
          <Flex justify="space-between" align="center">
            <Text size="sm" fontWeight="600">
              {title}
            </Text>
            <Tooltip label={localTime.format("LL (h:mma)")}>
              <Text cursor="pointer" fontSize="12px" color="gray.400">
                {localTime.fromNow()}
              </Text>
            </Tooltip>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            {description}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
}

export default Notification;
