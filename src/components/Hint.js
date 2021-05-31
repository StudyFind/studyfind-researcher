import React from "react";
import { Box, Icon, Tooltip } from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";

export const Hint = ({ label }) => (
  <Tooltip label={label}>
    {/* the Box component is requires as Tooltip needs to be positioned around a block element */}
    <Box>
      <Icon color="gray.400" as={FaExclamationCircle} />
    </Box>
  </Tooltip>
);
