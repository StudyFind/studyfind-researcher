import { useColor } from "hooks";
import { Box, Divider } from "@chakra-ui/react";

import Interns from "./Interns";
import Board from "./Board";
import Collaborations from "./Collaborations";

function Team() {
  const dividerColor = useColor("gray.200", "gray.600");

  return (
    <Box>
      <Interns />
      <Divider borderColor={dividerColor} />
      <Board />
      <Divider borderColor={dividerColor} />
      <Collaborations />
    </Box>
  );
}

export default Team;
