import { Flex, Icon, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";

export const Hint = ({
  label,
  icon = FaExclamationCircle,
  color = "gray",
  ...rest
}) => {
  const tooltipBackground = useColorModeValue(`gray.700`, `${color}.400`);

  return (
    <Tooltip label={label} background={tooltipBackground}>
      <Flex align="center">
        <Icon color={`${color}.400`} as={icon} {...rest} />
      </Flex>
    </Tooltip>
  );
};
