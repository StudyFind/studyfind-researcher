import React, { useState } from 'react'

import { Box, Above, Label, Block, Below, Error, TextInput, Limit, Peek } from '../styles'

function Text({ name, type, label, limit, value, error, onChange, ...rest }) {
  const [peek, setPeek] = useState(false)
  const [count, setCount] = useState(limit)
  const [focus, setFocus] = useState(false)

  const handleChange = value => {
    // Preveting entry of non-numeric characters for type number
    if(type === 'number') {
      const length = value.length
      const lastDigit = value[length - 1]
      const ALLOWED = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
      if(value) {
        if(!ALLOWED.includes(lastDigit)) value = value.slice(0, length - 1)
      }
    }

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
        <TextInput
          type={peek ? "text" : (type === "number" ? "text" : type)}
          value={value}
          onChange={event => handleChange(event.target.value)}
          maxLength={limit}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onPaste={e => (type === "number") && e.preventDefault()}
          style={{ paddingRight: (type === "password") && '3rem'}}
          {...rest}
        />
        { (type === "password") && <Peek onClick={() => setPeek(!peek)} className={`fa fa-${peek ? 'eye' : 'eye-slash'}`} /> }
      </Block>
      <Below>
        {!focus && (typeof error === 'string') &&  <Error>{ error }</Error>}
      </Below>
    </Box>
  )
}

export default Text
