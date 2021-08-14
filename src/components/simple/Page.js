import { Box, useColorModeValue } from "@chakra-ui/react";
import { Loader } from "./Loader";

export const Page = ({ children, isLoading, ...rest }) => {
  const background = useColorModeValue("#f8f9fa", "gray.800");

  return (
    <Box background={background} {...rest}>
      {isLoading ? <Loader /> : children}
    </Box>
  );
};
