import React from 'react'

// ensure no two options have the same value
// allow for multi-word options using _ as a delimiter
//

import { Box, Above, Label, RowBlock, TabOption, Below, Error } from '../styles'

function TabSelect({ name, label, options, value, error, multiple, onChange, ...rest}) {

  const handleChange = option => {
    if(!multiple) {
      onChange(name, (value === option ? '' : option))
    } else {
      if(value) {
        if(value.includes(option)) {
          onChange(name, value.filter(v => v !== option))
        } else {
          onChange(name, value.concat([option]))
        }
      } else {
        onChange(name, [option])
      }
    }
  }

  return (
    <Box error={error} {...rest}>
      <Above>
        {label && <Label>{ name.split('_').join(' ') }</Label>}
      </Above>
      <RowBlock>
        {
          options && options.map(option => (
            <TabOption
              key={option}
              error={error}
              selected={multiple ? (value && value.includes(option)) : value === option}
              onClick={() => handleChange(option)}
            >
              { option }
            </TabOption>
          ))
        }
      </RowBlock>
      <Below>
        {(typeof error === 'string') && <Error>{ error }</Error>}
      </Below>
    </Box>
  )
}

export default TabSelect
