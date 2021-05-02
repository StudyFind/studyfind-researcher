import React, { useContext } from "react";

import { eon } from "functions";
import { UserContext } from "context";

import { Tooltip, Text } from "@chakra-ui/react";

function NotificationTime({ time }) {
  const { timezone } = useContext(UserContext);

  const displayDate = eon.getFriendlyDate(time, timezone);
  const displayTime = eon.get12HourTime(time, timezone);
  const relativeTime = eon.getRelativeTime(time, timezone);

  return (
    <Tooltip label={`${displayDate} at ${displayTime}`}>
      <Text cursor="pointer" fontSize="12px" color="gray.400">
        {relativeTime}
      </Text>
    </Tooltip>
  );
}

export default NotificationTime;
