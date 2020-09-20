import React, { useState } from 'react'
import styled from 'styled-components'

import { colors } from './../../../constants'

function Checkbox({ name, value, onChange }) {
  const [checked, setChecked] = useState(value || false)

  const handleChange = value => {
    setChecked(value)
    onChange(name, value)
  }

  return (
    <Box checked={checked} onClick={event => handleChange(!checked)}>
      <Hidden type="checkbox" checked={value} />
      {checked && <Check className="fa fa-check" />}
    </Box>
  )
}

const Box = styled.span`
  border: 1px solid #d5dae2;
  background: white;
  border-radius: 0.15rem;
  height: 15px;
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.checked && `
    border-color: ${colors.primary.hard};
    background: ${colors.primary.hard};
  `}
`;

const Hidden = styled.input`
  opacity: 0;
  height: 0;
  width: 0;
  margin: 0;
`;

const Check = styled.span`
  color: white;
  font-size: 0.7rem;
`;

export default Checkbox
