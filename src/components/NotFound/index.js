import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {activeTheme} = value
      const imageUrl =
        activeTheme === 'light'
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      return (
        <div className={activeTheme}>
          <Header />
          <img src={imageUrl} alt="not found" />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
