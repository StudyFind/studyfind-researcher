import React from "react";
import { IconButton } from "@chakra-ui/react";

function CalendarHeadButton({ icon, onClick }) {
  return (
    <IconButton
      icon={icon}
      colorScheme=""
      color="blue.500"
      bg="blue.100"
      size="xs"
      onClick={onClick}
    />
  );
}

export default CalendarHeadButton;
