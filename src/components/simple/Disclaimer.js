import { useColor } from "hooks";
import { Text, Icon } from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";

export const Disclaimer = ({ color = "red", children }) => {
  const textColor = useColor(`${color}.500`, `${color}.400`);
  const background = useColor(`${color}.100`, `${color}.900`);

  return (
    <Text
      color={textColor}
      background={background}
      width="100%"
      padding="10px 15px"
      rounded="md"
      fontSize="sm"
      fontWeight="500"
      textAlign="center"
      borderWidth="1px"
      borderColor={textColor}
    >
      <Icon
        as={FaExclamationCircle}
        marginRight="5px"
        marginBottom="3px"
        fontSize="12px"
      />
      {children}
    </Text>
  );
};
