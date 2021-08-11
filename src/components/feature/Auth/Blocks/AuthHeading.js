import { Heading, useColorModeValue } from "@chakra-ui/react";

export const AuthHeading = ({ children, ...rest }) => {
  const color = useColorModeValue("blue.500", "blue.400");

  return (
    <Heading
      marginBottom="6px"
      color={color}
      fontSize="1.75rem"
      textAlign="center"
      {...rest}
    >
      {children}
    </Heading>
  );
};
