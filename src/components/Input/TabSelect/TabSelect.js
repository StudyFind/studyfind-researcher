import React from 'react'

import { Box, Above, Label, RowBlock, TabOption, Below, Error } from '../styles'

function TabSelect({ name, options, value, error, onChange }) {

  return (
    <Box error={error}>
      <Above>
        <Label>{ name.split('_').join(' ') }</Label>
      </Above>
      <RowBlock>
        {
          options && options.map(option => (
            <TabOption
              key={option}
              error={error}
              selected={value === option}
              onClick={() => onChange(name, (value === option ? '' : option))}
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
