import React from "react";
import { IconButton } from "@chakra-ui/react";

function CalendarHeadButton({ icon, onClick }) {
  return (
    <IconButton
      colorScheme=""
      color="blue.500"
      bg="blue.100"
      size="xs"
      icon={icon}
      onClick={onClick}
    />
  );
}

export default CalendarHeadButton;
