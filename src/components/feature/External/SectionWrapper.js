import { Flex } from "@chakra-ui/react";
import { useDetectDevice } from "hooks";

function SectionWrapper({ children, ...rest }) {
  const { isPhone } = useDetectDevice();

  return (
    <Flex
      justify="center"
      align="center"
      paddingX={isPhone ? "20px" : "100px"}
      paddingY="50px"
      minHeight="100vh"
      width="100vw"
      {...rest}
    >
      {children}
    </Flex>
  );
}

export default SectionWrapper;
