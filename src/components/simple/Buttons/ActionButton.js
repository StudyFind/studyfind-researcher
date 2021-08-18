import { useColor } from "hooks";
import { Tooltip, IconButton } from "@chakra-ui/react";

export const ActionButton = ({
  icon,
  hint,
  size = "sm",
  color,
  onClick,
  ...rest
}) => {
  const defaultColors = {
    color: useColor("gray.500", "gray.500"),
    bg: useColor("transparent", "transparent"),
    _hover: { bg: useColor("gray.100", "gray.900") },
    _active: { bg: useColor("gray.200", "gray.800") },
  };

  const schemedColors = {
    color: useColor(`${color}.500`, `${color}.400`),
    bg: useColor(`${color}.100`, `${color}.900`),
    _hover: { bg: useColor(`${color}.200`, `${color}.800`) },
    _active: { bg: useColor(`${color}.300`, `${color}.700`) },
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
