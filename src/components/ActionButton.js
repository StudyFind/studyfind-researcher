import React from "react";

import { Tooltip, IconButton } from "@chakra-ui/react";

function ActionButton({ icon, hint, color, onClick }) {
  const colorText = color ? `${color}.500` : "gray.400";
  const colorBack = color ? `${color}.100` : "transparent";
  const colorHover = color ? `${color}.200` : "gray.100";

  return (
    <Tooltip label={hint}>
      <IconButton
        icon={icon}
        size="sm"
        color={colorText}
        bg={colorBack}
        _hover={{ bg: colorHover }}
        onClick={onClick}
      />
    </Tooltip>
  );
}

export default ActionButton;
