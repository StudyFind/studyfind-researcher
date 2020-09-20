import React from 'react'

import { Box, Above, Block, Below, Error, RadioInput, RadioOption, OptionLabel, Prompt } from '../styles'

function Radio({ name, options, prompt, limit, value, error, onChange }) {
  return (
    <Box error={error}>
      <Above>
        <Prompt>{prompt}</Prompt>
      </Above>
      <Block>
        {
          options.map((option, index) => (
            <RadioOption key={option} onClick={event => onChange(name, option)}>
              <RadioInput id={option} name={name} checked={option === value} type="radio" readOnly />
              <OptionLabel htmlFor={option} selected={option === value}>{option}</OptionLabel>
            </RadioOption>
          ))
        }
      </Block>
      <Below>
        {(typeof error === 'string') && <Error>{ error }</Error>}
      </Below>
    </Box>
  )
}

export default Radio
