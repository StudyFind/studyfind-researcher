const colors = {
  primary: {
    hard: '#377dff',
    dark: '#045cff',
    soft: 'rgba(55, 125, 255, 0.2)',
    alpha: a => `rgba(55, 125, 255, ${a})`,
  },

  secondary: {
    hard: '#8A9BA8',
    dark: '#5f6a74',
    soft: 'rgba(138, 155, 169, 0.2)',
    alpha: a => `rgba(138, 155, 169, ${a})`,
  },

  success: {
    hard: '#00c9a7',
    dark: '#00967d',
    soft: 'rgba(0, 201, 167, 0.2)',
    alpha: a => `rgba(0, 201, 167, ${a})`,
  },

  warning: {
    hard: '#ffc107',
    dark: '#d39e00',
    soft: 'rgba(255, 193, 7, 0.2)',
    alpha: a => `rgba(255, 193, 7, ${a})`,
  },

  danger: {
    hard: '#de4437',
    dark: '#c22d20',
    soft: 'rgba(222, 68, 55, 0.2)',
    alpha: a => `rgba(222, 68, 55, ${a})`,
  }
}


export { colors }
