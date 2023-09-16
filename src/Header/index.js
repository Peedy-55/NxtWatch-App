import {Link} from 'react-router-dom'
import ThemeContext from '../context/ThemeContext'
import {CiLight} from 'react-icons/ci'
import {FaMoon} from 'react-icons/fa'

const Header = () => {
  return (
    <ThemeContext.Consumer>
      {value => {
        const {activeTheme, toggleTheme} = value
        const imageUrl =
          activeTheme === 'light'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        const toggleThemeIconUrl = activeTheme === 'light' ? '' : ''
        return (
          <nav className={`hor-card ${activeTheme}`}>
            <Link to="/">
              <img src={imageUrl} alt="nxt watch logo" />
            </Link>
            <button type="button" onClick={toggleTheme}>
              {activeTheme === 'light' ? <FaMoon /> : <CiLight />}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <button type="button" onClick={onClickLogout}>
              Logout
            </button>
          </nav>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default Header
