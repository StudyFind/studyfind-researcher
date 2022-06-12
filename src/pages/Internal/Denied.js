import { Flex } from "@chakra-ui/react";

function Denied({ children }) {
  return (
    <Flex
      gridGap="16px"
      direction="column"
      justify="center"
      align="center"
      h="100vh"
    >
      {children}
    </Flex>
  );
}

export default Denied;
