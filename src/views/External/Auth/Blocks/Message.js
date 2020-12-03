import React from "react";
import styled from "styled-components";

import { Heading, Text, Box, Flex } from "components";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function Message({ type, title, description, children }) {
  const status = {
    success: {
      icon: FaCheckCircle,
      color: "green",
    },
    failure: {
      icon: FaTimesCircle,
      color: "red",
    },
  };

  const { icon, color } = status[type] || status["success"];

  return (
    <Flex direction="column" p="40px 30px" alignItems="center" textAlign="center">
      <Box as={icon} w="40px" h="40px" color={`${color}.400`} />
      <Heading size="lg" mt="20px" mb="10px">
        {title}
      </Heading>
      <Text fontSize="1.25rem" mb="15px" color="gray.500">
        {description}
      </Text>
      {children}
    </Flex>
  );
}

export default Message;
