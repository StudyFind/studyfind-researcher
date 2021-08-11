import { useContext } from "react";
import { useDetectDevice } from "hooks";

import { Box, HStack, useColorModeValue } from "@chakra-ui/react";

import FooterCopyright from "./FooterCopyright";
import FooterLinks from "./FooterLinks";

function Footer() {
  const { isPhone } = useDetectDevice();
  const background = useColorModeValue("white", "gray.900");

  return (
    <Box>
      <HStack
        justify="space-between"
        align="center"
        padding={isPhone ? "20px" : "20px 50px"}
        background={background}
      >
        <FooterCopyright />
        <FooterLinks />
      </HStack>
    </Box>
  );
}

export default Footer;
