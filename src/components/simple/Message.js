import { useColor } from "hooks";
import { Heading, Text, Box, Icon, Center, Flex } from "@chakra-ui/react";
import {
  FaTimesCircle,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export const Message = ({
  status,
  title,
  description,
  children,
  showBackground,
  ...rest
}) => {
  const { icon, color } = {
    success: {
      icon: FaCheckCircle,
      color: "green",
    },
    neutral: {
      icon: FaExclamationCircle,
      color: "blue",
    },
    failure: {
      icon: FaTimesCircle,
      color: "red",
    },
  }[status || "neutral"];

  const iconColor = useColor(`${color}.400`, `${color}.400`);
  const background = useColor(`${color}.100`, `${color}.900`);
  const borderColor = useColor(`${color}.400`, `${color}.400`);
  const descriptionTextColor = useColor("gray.500", "gray.400");

  const backgroundStyles = showBackground
    ? {
        background,
        borderColor,
        borderWidth: "1px",
      }
    : {};

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      height="100%"
      width="100%"
      padding="30px"
      rounded="md"
      {...backgroundStyles}
      {...rest}
    >
      <Center maxWidth="400px">
        <Flex direction="column" align="center" textAlign="center">
          <Icon as={icon} height="36px" width="36px" color={iconColor} />
          <Heading fontSize="24px" marginTop="12px" marginBottom="6px">
            {title}
          </Heading>
          <Text color={descriptionTextColor}>{description}</Text>
          {children && <Box marginTop="15px">{children}</Box>}
        </Flex>
      </Center>
    </Flex>
  );
};
