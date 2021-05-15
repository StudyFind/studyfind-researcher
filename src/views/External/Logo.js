import React from "react";
import { Flex, Heading, Image } from "@chakra-ui/react";
import SFLogo from "images/logo.png";

function Logo() {
  return (
    <Flex align="center">
      <Image src={SFLogo} h="2rem" mr="10px" />
      <Heading fontSize="1.7rem">StudyFind</Heading>
    </Flex>
  );
}

export default Logo;
