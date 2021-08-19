import { Stack } from "@chakra-ui/react";
import { useDetectDevice } from "hooks";

function SectionWrapper({ children, ...rest }) {
  const { isPhone } = useDetectDevice();

  return (
    <Stack
      justify="center"
      align="center"
      paddingX={isPhone ? "40px" : "100px"}
      paddingY="50px"
      minHeight="100vh"
      width="100vw"
      {...rest}
    >
      {children}
    </Stack>
  );
}

export default SectionWrapper;
