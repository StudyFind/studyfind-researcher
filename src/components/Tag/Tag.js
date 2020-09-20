import React, { useState } from 'react'
import styled from 'styled-components'

import { colors } from './../../constants'

function Tag({ icon, color, children, onSelect, onDelete, ...rest }) {
  const [active, setActive] = useState()

  const clickable = onSelect && onDelete

  const handleClick = e => {
    if (clickable) {
      active
        ? onDelete(children)
        : onSelect(children)

      setActive(!active)
    }
  }

  return (
    <Box color={color} clickable={clickable} onClick={handleClick} active={active}>
      { icon && <Icon className={`fa fa-${icon}`} />}
      { children}
    </Box>
  )
}

const Box = styled.button`
  all: unset;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.3rem 0.5rem;
  border-radius: 0.25rem;

  ${props => props.clickable && `
      cursor: pointer;
  `}}

  ${props => {
    const { hard, soft } = colors[props.color] || colors.primary;
    return !props.active
      ? ` background: ${soft}; color: ${hard}; `
      : ` background: ${hard}; color: white; `
  }}
`

const Icon = styled.div`
  margin-right: 0.1rem;
  font-size: 0.75rem;
`

export default Tag
