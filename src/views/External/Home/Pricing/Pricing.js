import React from "react";
import styled from "styled-components";

import { colors } from "./../../../../constants";

import { Card, Button } from "components";
import { Box, Pill, Heading, Subheading } from "views/External/Home/styles";

function Pricing() {
  const plans = [
    {
      name: "Common",
      color: "primary",
      cost: 5,
    },
    {
      name: "Uncommon",
      color: "success",
      cost: 30,
    },
    {
      name: "Limited",
      color: "warning",
      cost: 200,
    },
    {
      name: "Rare",
      color: "danger",
      cost: 1000,
    },
  ];

  return (
    <Box id="pricing">
      <Pill> Pricing </Pill>
      <Heading color=""> Variable Pricing Plans </Heading>
      <Subheading>Pricing varies based on eligible participant demographics</Subheading>

      <Plans>
        {plans.map(({ name, color, cost }) => (
          <Plan key={name}>
            <Name color={color}>{name}</Name>
            <Price>
              <Dollar>$</Dollar> {cost}
            </Price>
            <Per>per participant</Per>
            <StartButton color={color}>Start</StartButton>
          </Plan>
        ))}
      </Plans>
    </Box>
  );
}

const Plans = styled.div`
  grid-gap: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Name = styled.h4`
  color: ${(props) => colors[props.color].hard};
  margin-bottom: 15px;
`;

const Plan = styled(Card)`
  width: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: 600;
  display: flex;
  align-items: flex-start;
`;

const Dollar = styled.span`
  font-size: 1rem;
  margin-top: 5px;
  font-weight: 500;
`;

const Per = styled.div`
  color: #77838f;
  font-size: 1.1rem;
`;

const StartButton = styled(Button)`
  color: white;
  width: 100%;
  margin-top: 20px;
  font-size: 0.9rem;
`;

export default Pricing;
