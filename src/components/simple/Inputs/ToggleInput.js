import { Button, useColorModeValue } from "@chakra-ui/react";

export const ToggleInput = ({
  name,
  label,
  colorScheme = "blue",
  value,
  onChange,
}) => {
  const defaultColor = useColorModeValue("gray.500", "gray.400");
  const defaultBackground = useColorModeValue("gray.100", "gray.800");
  const defaultBorderColor = useColorModeValue("gray.300", "gray.500");

  const activeColor = useColorModeValue(
    `${colorScheme}.500`,
    `${colorScheme}.400`
  );
  const activeBackground = useColorModeValue(
    `${colorScheme}.100`,
    `${colorScheme}.900`
  );
  const activeBorderColor = useColorModeValue(
    `${colorScheme}.400`,
    `${colorScheme}.400`
  );

  const styles = value
    ? {
        color: activeColor,
        background: activeBackground,
        borderColor: activeBorderColor,
        _hover: { activeBackground },
        _active: { activeBackground },
      }
    : {
        color: defaultColor,
        background: defaultBackground,
        borderColor: defaultBorderColor,
        _hover: { activeBackground },
        _active: { activeBackground },
      };

  const handleChange = () => {
    onChange(name, !value);
  };

  return (
    <Button size="sm" borderWidth="1px" onClick={handleChange} {...styles}>
      {label}
    </Button>
  );
};
