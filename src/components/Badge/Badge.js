import styled from 'styled-components'

import { colors } from './../../constants'

export default styled.div`
  display: inline-block;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.25px;
  padding: 0.2rem 0.4rem;
  border-radius: 0.15rem;

  ${props => {
    const { hard, soft } = colors[props.color] || colors.primary;
    return props.soft
      ? ` background: ${soft}; color: ${hard}; `
      : ` background: ${hard}; color: white; `
  }}
`
