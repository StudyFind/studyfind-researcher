import React from 'react'

function Form({ children, spacing, handleSubmit, ...props }) {
  const handleEnter = event => {
    if(event.keyCode === 13) handleSubmit()
  }

  return (
    <div onKeyUp={handleEnter} {...props}>
      {children}
    </div>
  )
}

export default Form
