import { Button, useColorModeValue } from "@chakra-ui/react";

export const EditorButton = ({
  children,
  icon,
  color = "gray",
  onClick,
  ...rest
}) => {
  const colorText = useColorModeValue(`${color}.500`, `${color}.400`);
  const colorBack = useColorModeValue(`${color}.100`, `${color}.900`);
  const colorHover = useColorModeValue(`${color}.200`, `${color}.800`);
  const colorBorder = useColorModeValue(`${color}.500`, `${color}.400`);

  return (
    <Button
      size="sm"
      leftIcon={icon}
      background={colorBack}
      color={colorText}
      borderWidth="1px"
      borderColor={colorBorder}
      _hover={{ bg: colorHover }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};
