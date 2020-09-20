import React from 'react'
import styled from 'styled-components'

import { colors } from './../../constants'

function Message({ type, icon, title, children, ...rest }) {

  const types = {
    neutral: colors.primary,
    success: colors.success,
    error: colors.danger,
  }

  return (
    <Center {...rest}>
      <Box>
        <Icon color={types[type] || colors.primary}><FaIcon className={`fas fa-${icon || 'exclamation'}`} /></Icon>
        <Heading color={types[type] || colors.primary}>{ title }</Heading>
        <Description>{ children }</Description>
      </Box>
    </Center>
  )
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

const Heading = styled.h2`
  color: ${props => props.color.hard};
`;

const Description = styled.div`
  font-size: 1.25rem;
`;

const Icon = styled.span`
  padding: 20px;
  margin-bottom: 15px;
  font-size: 1.5rem;
  border-radius: 100px;
  color: ${props => props.color.hard};
  background: ${props => props.color.alpha(0.1)};
`;

const FaIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

export default Message
