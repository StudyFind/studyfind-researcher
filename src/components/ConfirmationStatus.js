import React from "react";
import { Icon, Flex, Tooltip } from "@chakra-ui/react";
import { FaExclamationCircle, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

export const ConfirmationStatus = ({ children, status, hint }) => {
  const statuses = {
    success: { color: "green", icon: FaCheckCircle },
    neutral: { color: "gray", icon: FaExclamationCircle },
    failure: { color: "red", icon: FaTimesCircle },
  };

  const { icon, color } = statuses[status] || statuses.failure;

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
        <Icon as={icon} />
        {children}
      </Flex>
    </Tooltip>
  );
};
