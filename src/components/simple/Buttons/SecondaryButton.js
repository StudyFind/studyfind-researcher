import { Button, useColorModeValue } from "@chakra-ui/react";

export const SecondaryButton = ({ children, ...rest }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBackgroundColor = useColorModeValue("gray.100", "gray.800");

  return (
    <Button
      variant="outline"
      color="gray.500"
      borderColor={borderColor}
      _hover={{ background: hoverBackgroundColor }}
      {...rest}
    >
      {children}
    </Button>
  );
};
