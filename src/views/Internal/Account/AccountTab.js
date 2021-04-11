import React, { useEffect, useRef } from "react";
import { Button, Text } from "@chakra-ui/react";

function AccountTab({ icon, name, isSelected, onClick }) {
  const ref = useRef();

  useEffect(() => {
    if (isSelected) {
      ref.current.focus();
    }
  }, [isSelected]);

  return (
    <Button
      ref={ref}
      className="tab"
      bg={isSelected ? "blue.500" : "none"}
      color={isSelected ? "white" : "gray.500"}
      _hover={{ bg: isSelected ? "blue.500" : "gray.200" }}
      _active={{ bg: isSelected ? "blue.500" : "gray.300" }}
      textTransform="capitalize"
      justifyContent="flex-start"
      leftIcon={icon}
      onClick={onClick}
      onKeyPress={onClick}
    >
      <Text ml="8px">{name}</Text>
    </Button>
  );
}

export default AccountTab;
