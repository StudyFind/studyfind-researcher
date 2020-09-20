import React from 'react'

import Text from './Text/Text'
import Textarea from './Textarea/Textarea'
import Date from './Date/Date'
import Radio from './Radio/Radio'
import TabSelect from './TabSelect/TabSelect'
import Select from './Select/Select'
import Dropdown from './Dropdown/Dropdown'
import Switch from './Switch/Switch'
import Checkbox from './Checkbox/Checkbox'

function Input({ type, ...rest }) {
  switch(type) {
    case 'text':      return <Text type={type} {...rest} />
    case 'textarea':  return <Textarea type={type} {...rest} />
    case 'email':     return <Text type={type} {...rest} />
    case 'password':  return <Text type={type} {...rest} />
    case 'number':    return <Text type={type} {...rest} />
    case 'date':      return <Date type={type} {...rest} />
    case 'radio':     return <Radio type={type} {...rest} />
    case 'tabselect': return <TabSelect type={type} {...rest} />
    case 'select':    return <Select type={type} {...rest} />
    case 'dropdown':  return <Dropdown type={type} {...rest} />
    case 'switch':    return <Switch type={type} {...rest} />
    case 'checkbox':  return <Checkbox type={type} {...rest} />
    default:          return <Text type={type} {...rest} />
  }
}

export default Input
