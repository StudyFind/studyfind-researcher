import { useDetectDevice } from "hooks";

import { Flex, Heading, Image, HStack } from "@chakra-ui/react";
import SFLogo from "images/logo.png";

function HeaderLogo() {
  const { isPhone } = useDetectDevice();
  const headingStyles = isPhone ? { size: "md" } : { fontSize: "25px" };

  return (
    <HStack align="center" spacing={isPhone ? "8px" : "10px"}>
      <Image
        src={SFLogo}
        height={isPhone ? "1.5rem" : "1.8rem"}
      />
      <Heading {...headingStyles}>StudyFind</Heading>
      <Heading {...headingStyles} color="blue.500">
        Researcher
      </Heading>
    </HStack>
  );
}

export default HeaderLogo;
