import React from "react";

import { Flex, Tooltip } from "@chakra-ui/react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function MeetingsStatus({ confirmed }) {
  const { color, hint, text, icon } = confirmed
    ? {
        color: "green",
        hint: "Participant by confirmed",
        text: "Confirmed",
        icon: <FaCheckCircle />,
      }
    : {
        color: "gray",
        hint: "Participant confirmation pending",
        text: "Pending",
        icon: <FaExclamationCircle />,
      };

  return (
    <Tooltip label={hint}>
      <Flex
        px="12px"
        h="32px"
        align="center"
        gridGap="8px"
        cursor="default"
        fontSize="14px"
        fontWeight="600"
        rounded="md"
        color={`${color}.500`}
        borderColor={`${color}.300`}
        borderWidth="1px"
      >
        {icon}
        {text}
      </Flex>
    </Tooltip>
  );
}

export default MeetingsStatus;
