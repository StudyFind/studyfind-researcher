import styled from 'styled-components'
import { colors } from './../../constants'

export default styled.span`
  vertical-align: middle;
  display: inline-block;

  border: 0.2em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border .75s linear infinite;
  animation: spinner-border .75s linear infinite;

  @keyframes spinner-border {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  ${props => {
    switch(props.size) {
      case 'sm':
        return `
          width: 1rem;
          height: 1rem;
          border-width: 0.2rem;
        `

      case 'lg':
        return `
          width: 2rem;
          height: 2rem;
          border-width: 0.35rem;
        `

      default:
        return `
          width: 1.5rem;
          height: 1.5rem;
          border-width: 0.275rem;
        `
    }
  }}


  color: ${props => colors[props.color] && colors[props.color].hard};
`
