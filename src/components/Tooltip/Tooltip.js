import React from 'react'
import styled from 'styled-components'

import { colors } from './../../constants'

function Tooltip({ icon, color, children }) {
  return (
    <Box>
      <Icon className={`fa fa-${icon || 'question-circle'}`} color={color} />
      <Hint>{ children }</Hint>
    </Box>
  )
}

const Box = styled.div`
  position: relative;
  width: 100%;
`

const Hint = styled.div`
  display: none;
`

const Icon = styled.span`
  color: ${props => colors[props.color] ? colors[props.color].hard : colors.secondary.hard};

  &:hover + ${Hint} {
    display: flex;
    font-size: 0.8rem;
    font-weight: 500;
    top: -1px;
    left: 20px;
    position: absolute;
    padding: 3px 6px;
    color: white;
    border-radius: 0.25rem;
    background: rgb(0, 0, 0, 0.8);
  }
`

export default Tooltip
