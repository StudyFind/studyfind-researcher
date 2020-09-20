import styled from 'styled-components'

import { colors } from './../../constants'


/**
 * INPUT ELEMENTS
 */

export const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #d5dae2;
  -webkit-appearance: none;

  ${props => props.focus && `
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    // box-shadow: 0 0 0 0.15rem ${colors.primary.alpha(0.5)};
  `}
`

export const TextInput = Input

export const TextAreaInput = styled.textarea`
  resize: vertical;
  width: 100%;
  height: ${props => props.height};
  font-size: 1rem;
  color: black !important;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #d5dae2;
`

export const RadioInput = styled.input``

export const SelectInput = styled.select`
  width: 100%;
  font-size: 1rem;
  color: black !important;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #d5dae2;
  -webkit-appearance: none;
`


/**
 * Option Elements
 */

export const Option = styled.option``

export const TabOption = styled.div`
  cursor: pointer;
  color: #999;
  background: white;
  border: 1px solid #d5dae2;
  width: 100%;
  margin-right: -1px;
  padding: 0.75rem;
  text-align: center;

  &:first-child {
    border-top-left-radius: 0.3125rem;
    border-bottom-left-radius: 0.3125rem;
  }

  &:last-child {
    border-top-right-radius: 0.3125rem;
    border-bottom-right-radius: 0.3125rem;
  }


  ${props => props.selected && `
    z-index: 2;
    font-weight: 500;
    color: ${colors.primary.hard};
    border-color: ${colors.primary.hard} !important;
    background: ${colors.primary.alpha(0.15)};
  `}
`

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
`


/**
 * LAYOUT ELEMENTS
 */

export const Box = styled.div`
  width: 100%;
  ${props => props.error && `
      & > * > * {
        color: ${colors.danger.hard} !important;
        border-color: ${colors.danger.hard} !important;
      }
      .react-datepicker__input-container {
        input {
          color: ${colors.danger.hard} !important;
          border-color: ${colors.danger.hard} !important;
        }
      }
  `}

  ${props => props.error !== undefined && !props.error && `
      & > * > * {
        color: ${colors.success.hard} !important;
        border-color: ${colors.success.hard} !important;
      }
      .react-datepicker__input-container {
        input {
          color: ${colors.success.hard} !important;
          border-color: ${colors.success.hard} !important;
        }
      }
  `}

  ${props => props.focus && `
    & > * > * {
      color: rgba(55, 125, 255) !important;
      border-color: rgba(55, 125, 255, 0.8) !important;
    }
    .react-datepicker__input-container {
      input {
        color: rgba(55, 125, 255) !important;
        border-color: rgba(55, 125, 255, 0.8) !important;
      }
    }
  `}
`

export const Above = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Block = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-gap: 2px;
`

export const RowBlock = styled.div`
  display: flex;
  width: 100%
`

export const Below = styled.div``


/**
 * ICON ELEMENTS
 */

export const Arrow = styled.i`
  color: #8d98a5;
  font-size: 1.1rem;
  position: absolute;
  height: 10px;
  width: 10px;
  top: 19px;
  right: 19px;
  z-index: 3;
  border: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events:none;
`

export const Close = styled.i`
  color: #8d98a5;
  font-size: 0.9rem;
  position: absolute;
  height: 10px;
  width: 10px;
  top: 19px;
  right: 19px;
  z-index: 3;
  border: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const Peek = styled.span`
  cursor: pointer;
  color: #888;
  position: absolute;
  top: 35%;
  right: 15px;
`

export const Calendar = styled.span`
  pointer-events: none;
  color: #888;
  position: absolute;
  top: 35%;
  right: 15px;
`


/**
 * TEXT ELEMENTS
 */

export const Label = styled.div`
  display: block;
  text-transform: uppercase;
  color: #888;
  font-weight: 600;
  font-size: 0.75rem;
`

// export const Label = styled.div`
//   display: block;
//   text-transform: capitalize;
//   color: #888;
//   font-weight: 400;
//   font-size: 0.9rem;
// `

export const OptionLabel = styled.div`
  font-size: 1rem;
  color: #999;
  margin-left: 4px;
  margin-top: 2px;

  ${props => props.selected && `
    color: black;
    font-weight: 500;
  `}
`

export const Prompt = styled.div`
  font-weight: 600;
  color: #888;
`

export const Error = styled.div`
  display: block;
  font-size: 0.75rem;
  margin-top: 2px;
  font-weight: 500;
`

export const Limit = styled.div`
  color: #888;
  font-size: 0.75rem;
  font-weight: 400;
`
