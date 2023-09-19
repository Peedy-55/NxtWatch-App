import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
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
              <img src={imageUrl} alt="website logo" />
            </Link>
            <div>
              <button type="button" data-testid="theme" onClick={toggleTheme}>
                {activeTheme === 'light' ? <FaMoon /> : <BsSun />}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />

              <Popup
                modal
                data-testid="banner"
                className="popup"
                trigger={<button type="button">Logout</button>}
              >
                {close => (
                  <div>
                    <p>Are you sure, you want to logout?</p>
                    <div className="hor-card">
                      <button type="button" onClick={() => close()}>
                        Cancel
                      </button>
                      <button type="button" onClick={onClickLogout}>
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </nav>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default withRouter(Header)
