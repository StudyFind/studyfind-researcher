import React from "react";

import { Tooltip, IconButton } from "@chakra-ui/react";

function ParticipantActionButton({ name, icon, handleAction }) {
  return (
    <Tooltip label={name.charAt(0).toUpperCase() + name.substring(1)}>
      <IconButton
        color="gray.400"
        size="sm"
        bg="transparent"
        icon={icon}
        onClick={() => handleAction(name)}
      />
    </Tooltip>
  );
}

export default ParticipantActionButton;
