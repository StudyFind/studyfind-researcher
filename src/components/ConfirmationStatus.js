import React from "react";

import { Flex, Tooltip } from "@chakra-ui/react";
import { FaExclamationCircle, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

function ConfirmationStatus({ children, status, hint }) {
  const statuses = {
    success: { icon: <FaCheckCircle />, color: "green" },
    neutral: { icon: <FaExclamationCircle />, color: "gray" },
    error: { icon: <FaTimesCircle />, color: "red" },
  };

  const { icon, color } = statuses[status] || statuses["neutral"];

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
        {children}
      </Flex>
    </Tooltip>
  );
}

export default ConfirmationStatus;
