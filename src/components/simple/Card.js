import { Box, useColorModeValue } from "@chakra-ui/react";

export const Card = ({ children, ...rest }) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const backgroundColor = useColorModeValue("white", "gray.900");

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      background={backgroundColor}
      rounded="md"
      {...rest}
    >
      {children}
    </Box>
  );
};
