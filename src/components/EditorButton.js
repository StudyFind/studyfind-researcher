import React from "react";
import { Button } from "@chakra-ui/react";

function EditorButton({ children, icon, color, onClick }) {
  return (
    <Button
      size="sm"
      leftIcon={icon}
      bg={`${color}.100`}
      color={`${color}.500`}
      borderWidth="1px"
      borderColor={`${color}.500`}
      _hover={{ bg: `${color}.200` }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default EditorButton;
