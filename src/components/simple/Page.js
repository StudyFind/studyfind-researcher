import { useColor } from "hooks";
import { Box, Icon } from "@chakra-ui/react";
import { Loader } from "./Loader";
import Denied from "pages/Internal/Denied";
import { FaTimesCircle } from "react-icons/fa";

export const Page = ({ children, isLoading, isPrivate, ...rest }) => {
  const background = useColor("#f8f9fa", "gray.800");

  const iconColor = useColor("red.500", "red.400");

  const PRIVATE = (
    <Denied>
      <Icon as={FaTimesCircle} color={iconColor} fontSize="36px" />
      <Box textAlign="center">
        Thank you for registering! Your private beta account should be approved
        shortly. If this status persists for more than a few days, please send a
        message to <strong>Outreach@StudyFind.org</strong>
      </Box>
    </Denied>
  );

  return (
    <Box background={background} {...rest}>
      {isLoading ? (
        <Loader height="calc(100vh - 80px)" />
      ) : isPrivate ? (
        children
      ) : (
        PRIVATE
      )}
    </Box>
  );
};
