import React from 'react'
import styled from 'styled-components'
import { colors } from './../../../constants'

function DropdownList({ value, onSelect, focus, filtered }) {
  return focus && (
    <List>
      {
        filtered && (
        filtered.length
        ? filtered.map(option => (
            <Option
              key={option}
              value={option}
              selected={option === value}
              onClick={() => onSelect(option)}
            >
              { option }
            </Option>
        ))
        : <Empty> No results found </Empty>)
      }
    </List>
  )
}

const List = styled.div`
  z-index: 5;
  position: absolute;
  top: 47px;
  max-height: 184px;
  overflow-y: scroll;
  background: white;
  width: 100%;
  border: 1px solid rgba(55, 125, 255, 0.8);
  border-top: none;
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
`

const Option = styled.div`
  color: #888;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    font-weight: 500;
    color: rgb(55, 125, 255) !important;
    background: rgba(55, 125, 255, 0.2) !important;
  }

  ${props => props.selected && `
    font-weight: 500;
    color: #666 !important;
    background: ${colors.secondary.soft} !important;
  `}
`

const Empty = styled.div`
  color: #888 !important;
  padding: 0.75rem;
`

export default DropdownList
