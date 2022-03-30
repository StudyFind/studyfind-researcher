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
        Please wait until your private beta account is approved. If this does
        not update in a few days, please reach out to
        <strong>outreach@studyfind.org</strong>
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
