import React, { useState } from 'react'

import { Box, Above, Label, Block, Below, Error, Calendar } from '../styles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Date({ name, type, limit, minDate, maxDate, value, error, onChange, ...rest }) {
  const [focus, setFocus] = useState(false)

  const handleChange = date => {
    setFocus(false)
    onChange(name, date)
  }

  return (
    <Box focus={focus} error={error} onBlur={() => setFocus(false)}>
      <Above>
        <Label>{ name.split('_').join(' ') }</Label>
      </Above>
      <Block>
        <DatePicker
          dateFormat="MM/dd/yyyy"
          selected={value}
          onChange={date => handleChange(date)}
          maxDate={maxDate}
          minDate={minDate}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
        <Calendar className="fas fa-calendar" />
      </Block>
      <Below>
        {!focus && (typeof error === 'string') && <Error error={error}>{ error }</Error>}
      </Below>
    </Box>
  )
}




export default Date
