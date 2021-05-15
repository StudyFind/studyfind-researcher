import React from "react";

import { Tooltip, IconButton } from "@chakra-ui/react";

function ActionButton({ icon, hint, color, onClick }) {
  const colorText = `${color}.500`;
  const colorBack = `${color}.100`;
  const colorHover = `${color}.200`;

  return (
    <Tooltip label={hint}>
      <IconButton
        icon={icon}
        size="sm"
        color={color ? colorText : "gray.400"}
        bg={color ? colorBack : "transparent"}
        _hover={{ bg: color ? colorHover : "gray.100" }}
        onClick={onClick}
      />
    </Tooltip>
  );
}

export default ActionButton;
