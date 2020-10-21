import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "components";

import HeroBackground from "images/analysis.svg";

function Hero() {
  return (
    <Box id="home">
      <Intro>
        <Heading>
          <Strong>Revolutionizing</Strong>
          <br /> Participant Recruitment
        </Heading>
        <StyledLink to="/auth">
          <StartButton>
            Start Now
            <Arrow className="fa fa-arrow-circle-right"></Arrow>
          </StartButton>
        </StyledLink>
      </Intro>
      <Image src={HeroBackground} />
    </Box>
  );
}

const Box = styled.section`
  height: 100vh;
  padding: 50px;

  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;
  }
`;

const Image = styled.img`
  margin-top: auto;
  width: 50vw;

  @media (max-width: 600px) {
    width: 60vw;
    margin-bottom: 30px;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Strong = styled.span`
  color: #377dff;
`;

const StartButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 60px;
  margin-top: 30px;
  font-size: 1.1rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #323232;

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const StyledLink = styled(Link)`
  all: unset;
`;

const Arrow = styled.span``;

export default Hero;
