import React from "react";
import { Button } from "@chakra-ui/react";

function EditorButton({ children, icon, color = "gray", onClick }) {
  const colorText = `${color}.500`;
  const colorBack = `${color}.100`;
  const colorHover = `${color}.200`;
  const colorBorder = `${color}.500`;

  return (
    <Button
      size="sm"
      leftIcon={icon}
      bg={colorBack}
      color={colorText}
      borderWidth="1px"
      borderColor={colorBorder}
      _hover={{ bg: colorHover }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default EditorButton;
