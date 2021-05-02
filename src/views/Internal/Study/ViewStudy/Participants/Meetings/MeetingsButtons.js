import React from "react";

import { Flex, Tooltip, IconButton } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt, FaPhone } from "react-icons/fa";

function MeetingButtons({ confirmed, handleJoin, handleEdit, handleDelete }) {
  const color = confirmed ? "green" : "gray";

  return (
    <Flex gridGap="4px">
      <Tooltip label="Join">
        <IconButton
          icon={<FaPhone />}
          size="sm"
          color={`${color}.500`}
          bg={`${color}.100`}
          _hover={{ bg: `${color}.200` }}
          onClick={handleJoin}
        />
      </Tooltip>
      <Tooltip label="Edit">
        <IconButton
          icon={<FaPencilAlt />}
          size="sm"
          color="blue.500"
          bg="blue.100"
          _hover={{ bg: "blue.200" }}
          onClick={handleEdit}
        />
      </Tooltip>
      <Tooltip label="Delete">
        <IconButton
          icon={<FaTrashAlt />}
          size="sm"
          color="red.500"
          bg="red.100"
          _hover={{ bg: "red.200" }}
          onClick={handleDelete}
        />
      </Tooltip>
    </Flex>
  );
}

export default MeetingButtons;
