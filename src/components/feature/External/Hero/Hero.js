import styled from "styled-components";
import { useDetectDevice } from "hooks";

import SectionWrapper from "../SectionWrapper";

import HeroLogo from "./HeroLogo";
import HeroCallout from "./HeroCallout";

function Hero({ blackText, blueText, buttonText, buttonLink, image }) {
  const { isPhone } = useDetectDevice();

  const Container = styled(SectionWrapper)`
    ${isPhone ||
    `background: url(${image});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;`}
  `;

  return (
    <Container
      direction="column"
      justify="space-between"
      align="flex-start"
      padding={isPhone ? "30px" : "50px"}
    >
      <HeroLogo />
      <HeroCallout
        blackText={blackText}
        blueText={blueText}
        buttonText={buttonText}
        buttonLink={buttonLink}
      />
    </Container>
  );
}

export default Hero;
