import React, { useState } from 'react'

import { Box, Above, Label, Block, Below, Error, TextAreaInput } from '../styles'

function Textarea({ name, type, limit, value, error, height, onChange, ...rest }) {
  const [focus, setFocus] = useState(false)

  const handleChange = value => {
    onChange(name, value)
  }

  return (
    <Box focus={focus} error={error}>
      <Above>
        <Label>{ name.split('_').join(' ') }</Label>
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
