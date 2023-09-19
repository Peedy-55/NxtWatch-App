import React from 'react'

const ThemeContext = React.createContext({
  activeTheme: 'light',
  savedVideosList: [],
  updateSavedVideosList: () => {},
  changeTheme: () => {},
})

export default ThemeContext
