import React from "react";

import { FaBars } from "react-icons/fa";
import { Flex } from "@chakra-ui/react";
import { SortableHandle } from "react-sortable-hoc";

export default SortableHandle(() => (
  <Flex cursor="row-resize" h="40px" w="40px" color="gray.500" justify="center" align="center">
    <FaBars />
  </Flex>
));
