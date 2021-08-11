import { Tooltip, IconButton, useColorModeValue } from "@chakra-ui/react";

export const ActionButton = ({
  icon,
  hint,
  size = "sm",
  color,
  onClick,
  ...rest
}) => {
  const defaultColors = {
    color: useColorModeValue("gray.500", "gray.500"),
    bg: useColorModeValue("transparent", "transparent"),
    _hover: { bg: useColorModeValue("gray.100", "gray.900") },
    _active: { bg: useColorModeValue("gray.200", "gray.800") },
  };

  const schemedColors = {
    color: useColorModeValue(`${color}.500`, `${color}.400`),
    bg: useColorModeValue(`${color}.100`, `${color}.900`),
    _hover: { bg: useColorModeValue(`${color}.200`, `${color}.800`) },
    _active: { bg: useColorModeValue(`${color}.300`, `${color}.700`) },
  };

  const colors = color ? schemedColors : defaultColors;

  return (
    <Tooltip label={hint}>
      <IconButton
        size={size}
        icon={icon}
        onClick={onClick}
        {...colors}
        {...rest}
      />
    </Tooltip>
  );
};
