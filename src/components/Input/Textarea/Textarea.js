import React, { useState } from 'react'

import { Box, Above, Label, Block, Limit, Below, Error, TextAreaInput } from '../styles'

function Textarea({ name, type, label, limit, value, error, height, onChange, ...rest }) {
  const [count, setCount] = useState(limit)
  const [focus, setFocus] = useState(false)

  const handleChange = value => {
    onChange(name, value)
    setCount(limit - value.length)
  }

  return (
    <Box focus={focus} error={error}>
      <Above>
        {label && <Label>{ name.split('_').join(' ') }</Label>}
        <Limit>{ limit && `${count} characters left`}</Limit>
      </Above>
      <Block>
        <TextAreaInput
          value={value}
          onChange={event => handleChange(event.target.value)}
          maxLength={limit}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          height={height}
          {...rest}
        />
      </Block>
      <Below>
        {!focus && (typeof error === 'string') && <Error>{ error }</Error>}
      </Below>
    </Box>
  )
}


export default Textarea
