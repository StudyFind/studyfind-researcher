import React from "react";
import styled from "styled-components";
import { Flex } from "@chakra-ui/react";
import Logo from "images/logo.png";

function Loading() {
  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Image src={Logo} />
    </Flex>
  );
}

const Image = styled.img`
  @-webkit-keyframes rotate-center {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes rotate-center {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  width: 50px;
  -webkit-animation: rotate-center 1s ease-in-out infinite both;
  animation: rotate-center 1s ease-in-out infinite both;
`;

export default Loading;
