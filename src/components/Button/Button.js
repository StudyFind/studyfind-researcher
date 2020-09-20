import React from 'react'
import styled from 'styled-components'

import Spinner from 'components/Spinner/Spinner'

import { colors } from './../../constants'

function Button({ children, color, type, soft, loading, disabled, ...rest }) {

  return (
    <Box color={color} soft={soft} disabled={disabled || loading} {...rest}>
      { children }
      { loading && <Loading size="sm" /> }
    </Box>
  )
}

const Box = styled.button`
  cursor: pointer;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;

  ${props => {
    const { hard, soft } = colors[props.color] || colors.primary;
    return props.soft
      ? ` background: ${soft}; color: ${hard}; `
      : ` background: ${hard}; color: white;  `
  }}

  ${props => {
    const { hard, dark } = colors[props.color] || colors.primary;
    return props.disabled
      ? `
        opacity: 0.6;
        &:hover { cursor: not-allowed }
      `
      : `
        &:hover { background: ${hard}; color: white; }
        &:active { background: ${dark}; color: white; }
      `
  }}
`

const Loading = styled(Spinner)`
  margin-left: 6px;
`

export default Button
