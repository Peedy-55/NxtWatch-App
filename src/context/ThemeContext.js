import React from 'react'

const ThemeContext = React.createContext({
  activeTheme: 'light',
  changeTheme: () => {},
})

export default ThemeContext
