import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'
import ThemeContext from '../../context/ThemeContext'

const Sidebar = () => (
  <ThemeContext.Consumer>
    {value => {
      const {activeTheme} = value

      return (
        <div className={`ver-card ${activeTheme}`}>
          <ul>
            <Link to="/">
              <li className="hor-card">
                <AiFillHome />
                <p>Home</p>
              </li>
            </Link>
            <Link to="/trending">
              <li className="hor-card">
                <HiFire />
                <p>Trending</p>
              </li>
            </Link>
            <Link to="/gaming">
              <li className="hor-card">
                <SiYoutubegaming />
                <p>Gaming</p>
              </li>
            </Link>
            <Link to="/saved-videos">
              <li className="hor-card">
                <RiPlayListAddLine />
                <p>Saved videos</p>
              </li>
            </Link>
          </ul>
          <div>
            <p>CONTACT US</p>
            <div className="hor-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default Sidebar
