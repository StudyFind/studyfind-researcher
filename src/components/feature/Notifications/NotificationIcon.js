import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

function NotificationIcon({ icon, color }) {
  const iconColor = useColorModeValue(`${color}.400`, `${color}.400`);
  const backgroundColor = useColorModeValue(`${color}.100`, `${color}.900`);

  return (
    <Flex
      padding="12px"
      rounded="full"
      justify="center"
      align="center"
      background={backgroundColor}
    >
      <Icon as={icon} width="16px" height="16px" color={iconColor} />
    </Flex>
  );
}

export default NotificationIcon;
