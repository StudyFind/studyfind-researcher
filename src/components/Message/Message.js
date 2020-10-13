import React from "react";
import styled from "styled-components";

import { colors } from "./../../constants";

function Message({ type, title, children, ...rest }) {
  const types = {
    neutral: colors.primary,
    success: colors.success,
    failure: colors.danger,
  };

  const icons = {
    neutral: "exclamation",
    success: "check",
    failure: "times",
  };

  return (
    <Center {...rest}>
      <Box>
        <Icon color={types[type] || colors.primary}>
          <FaIcon className={`fas fa-${icons[type] || "exclamation"}`} />
        </Icon>
        <Heading color={colors.primary}>{title}</Heading>
        <Description>{children}</Description>
      </Box>
    </Center>
  );
}

const Center = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  line-height: 1.5;
  color: ${(props) => props.color.hard};
  text-align: center;
`;

const Description = styled.div`
  line-height: 1.5;
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
`;

const Icon = styled.span`
  padding: 26px;
  margin-bottom: 15px;
  font-size: 1.75rem;
  border-radius: 100px;
  color: ${(props) => props.color.hard};
  background: ${(props) => props.color.alpha(0.1)};
`;

const FaIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
`;

export default Message;
