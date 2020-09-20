import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { colors } from './../../constants'

function Toast({ type, icon, delay, children, closeToast }) {
  const [time, setTime] = useState(delay || 10)

  useEffect(() => {
    console.log(time)
    if(time <= 0) closeToast()

    const countdown = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [time])

  const icons = {
    primary:    'info-circle',
    secondary:  'question-circle',
    success:    'check-circle',
    warning:    'exclamation-circle',
    danger:     'times-circle'
  }

  return (
    <Box type={type}>
      <Icon type={type} className={`fas fa-${icon || icons[type]}`} />
      <Message>{ children }</Message>
      <Close type={type} className="fas fa-times" onClick={closeToast} />
    </Box>
  )
}

const Box = styled.div`
  pointer-events: all;

  @keyframes appear {
    0% {
      opacity: 0;
      transform: translateY(-120%);
    }

    100% {
      transform: translateY(0px);
    }
  }

  animation: 240ms cubic-bezier(0.175, 0.885, 0.32, 1.175) 0s 1 normal both running appear;
  transition: all 240ms cubic-bezier(0, 0, 0.2, 1) 0s;
  z-index: 5;
  padding: 0.9rem;
  display: flex;
  align-items: center;
  grid-gap: 10px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  background: white;
  border-left: 4px solid ${props => colors[props.type] ? colors[props.type].hard : colors.primary.hard};
  border-radius: 0.25rem;
  box-shadow: rgba(150, 150, 150, 0.3) 0px 0px 1px, rgba(150, 150, 150, 0.47) 0px 8px 10px -4px;
`

const Icon = styled.span`
  font-size: 1rem;
  color: ${props => colors[props.type] ? colors[props.type].hard : colors.primary.hard};
`

const Message = styled.span`
  margin-right: 20px;
`

const Close = styled.span`
  padding: 5px;
  font-size: 0.8rem;
  height: 20px;
  width: 20px;
  color: ${colors.secondary.hard};
  border-radius: 0.25rem;
  margin-left: auto;

  &::before {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background: ${colors.secondary.soft};
  }
`

export default Toast
