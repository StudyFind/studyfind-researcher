import { Box } from "@chakra-ui/react";
import { Loader } from "./Loader";

export const Page = ({ children, isLoading }) => (
  <Box padding="40px" height="100%" background="#f8f9fa">
    {isLoading ? <Loader /> : children}
  </Box>
);
