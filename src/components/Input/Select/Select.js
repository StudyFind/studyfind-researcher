import React, { useState } from 'react'

import { Box, Above, Label, Block, Below, Error, Arrow, SelectInput, Option } from '../styles'

function Select({ name, options, value, error, onChange, ...rest }) {
  const [focus, setFocus] = useState(false)

  return (
    <Box focus={focus} error={error}>
      <Above>
        <Label>{ name.split('_').join(' ') }</Label>
      </Above>
      <Block>
        <SelectInput
          value={value}
          onChange={event => onChange(name, event.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...rest}
        >
          <Option value=""></Option>
          {options && options.map((option, i) => <Option key={i} value={option}>{option}</Option>)}
        </SelectInput>
        <Arrow className="fa fa-caret-down"></Arrow>
      </Block>
      <Below>
        {!focus && (typeof error === 'string') && <Error error={error}>{ error }</Error>}
      </Below>
    </Box>
  )
}

export default Select
