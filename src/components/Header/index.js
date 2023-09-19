import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSun} from 'react-icons/bs'
import {FaMoon} from 'react-icons/fa'
import ThemeContext from '../../context/ThemeContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {activeTheme, toggleTheme} = value
        const imageUrl =
          activeTheme === 'light'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

        return (
          <nav className={`hor-card ${activeTheme}`}>
            <Link to="/">
              <img src={imageUrl} alt="nxt watch logo" />
            </Link>
            <div>
              <button type="button" data-testid="theme" onClick={toggleTheme}>
                {activeTheme === 'light' ? <FaMoon /> : <BsSun />}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <button type="button" onClick={onClickLogout}>
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default withRouter(Header)
