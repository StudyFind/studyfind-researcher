import { useColorModeValue } from "@chakra-ui/react";

export const AuthInput = ({ as: As, ...rest }) => {
  const background = useColorModeValue("white", "gray.900");
  return <As size="lg" background={background} {...rest} />;
};
