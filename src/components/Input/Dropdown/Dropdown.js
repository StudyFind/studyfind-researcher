import React, { useState, useEffect } from 'react'

import { Box, Above, Label, Block, Input, Close, Arrow, Below, Error } from '../styles'
import List from './DropdownList'
import useDelayedBlur from './useDelayedBlur'

function Dropdown({ name, label, options, value, error, onChange, ...rest }) {
  const [focus, doFocus, doBlur] = useDelayedBlur()
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState(options)

  const handleSearch = value => {
    setSearch(value)
  }

  useEffect(() => {
    if (options.includes(search)) setFiltered(options)
    else setFiltered(options.filter(option => option.toLowerCase().includes(search.toLowerCase())))

  }, [search, options])

  const handleChange = value => {
    doBlur()
    onChange(name, value)
  }

  return (
    <Box focus={focus} error={error}>
      <Above>
        {label && <Label>{ name.split('_').join(' ') }</Label>}
      </Above>
      <Block onFocus={doFocus} onBlur={doBlur}>
        <Input
          value={focus ? search : value}
          onChange={event => handleSearch(event.target.value)}
          focus={focus}
          {...rest}
        />
        <List value={value} onSelect={handleChange} focus={focus} filtered={filtered} />
        {
          focus
            ? <Close className="fa fa-times" onClick={doBlur}></Close>
            : <Arrow className="fa fa-caret-down"></Arrow>
        }
      </Block>
      <Below>
        {!focus && (typeof error === 'string') && <Error error={error}>{ error }</Error>}
      </Below>
    </Box>
  )
}


export default Dropdown
