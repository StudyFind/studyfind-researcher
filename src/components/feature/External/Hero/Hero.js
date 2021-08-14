import styled from "styled-components";
import { useDetectDevice } from "hooks";

import { Box, Flex, Heading, Button, Text, Image } from "@chakra-ui/react";
import { Link } from "components";

import SFLogo from "images/logo.png";

function Hero({ blackText, blueText, buttonText, buttonLink, image }) {
  const { isPhone } = useDetectDevice();

  const Container = styled(Box)`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${isPhone ||
    `background: url(${image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;`}
  `;

  const Call = styled.div`
    display: flex;
    grid-gap: 60px;
    flex-direction: column;
    align-items: flex-start;
  `;

  return (
    <Container padding={isPhone ? "30px" : "50px"}>
      <Flex align="center">
        <Image src={SFLogo} height="1.8rem" marginRight="10px" />
        <Heading fontSize="1.7rem">StudyFind</Heading>
      </Flex>
      <Call>
        <Heading size="2xl" lineHeight="1.25">
          {blackText}
          <Text color="blue.500">{blueText}</Text>
        </Heading>
        <Link to={buttonLink} isWrapper>
          <Button size="lg" colorScheme="blue">
            {buttonText}
          </Button>
        </Link>
      </Call>
    </Container>
  );
}

export default Hero;
