import React from "react";
import { Box, Tooltip, IconButton } from "@chakra-ui/react";

function ParticipantActionButton({ name, icon, onClick }) {
  return (
    <Box onClick={onClick}>
      <Tooltip label={name.charAt(0).toUpperCase() + name.substring(1)}>
        <IconButton color="gray.400" size="sm" bg="transparent" icon={icon} />
      </Tooltip>
    </Box>
  );
}

export default ParticipantActionButton;
