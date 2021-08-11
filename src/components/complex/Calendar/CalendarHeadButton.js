import { IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

function CalendarHeadButton({ icon, onClick }) {
  const color = useColorModeValue("blue.500", "blue.400");
  const background = useColorModeValue("blue.100", "blue.900");

  return (
    <IconButton
      colorScheme=""
      color={color}
      background={background}
      size="xs"
      icon={icon}
      onClick={onClick}
    />
  );
}

export default CalendarHeadButton;
