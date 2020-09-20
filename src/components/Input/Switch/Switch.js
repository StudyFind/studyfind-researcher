import React from 'react'

function Switch({ name, value, onChange, title, description }) {
  return (
    <div className="toggle">
      <label className="toggle-switch">
        <input type="checkbox" className="toggle-switch-input" checked={value} onClick={e => onChange(name, e.target.checked)} />
        <span className="toggle-switch-label">
          <span className="toggle-switch-indicator"></span>
        </span>
      </label>
      <div className="toggle-info">
        <div className="toggle-title">{ title }</div>
        <div className="toggle-description">{ description }</div>
      </div>
    </div>
  )
}

export default Switch
