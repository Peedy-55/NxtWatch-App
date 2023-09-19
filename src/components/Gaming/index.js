import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import Sidebar from '../Sidebar'
import GameItem from '../GameItem'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Gaming extends Component {
  state = {
    pageStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount = () => {
    this.getVideosList()
  }

  getVideosList = async () => {
    this.setState({
      pageStatus: apiStatusConstants.loading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.videos)
      this.setState({
        pageStatus: apiStatusConstants.success,
        videosList: data.videos,
      })
    } else {
      this.setState({
        pageStatus: apiStatusConstants.failure,
      })
    }
  }

  renderPageDetails = activeTheme => {
    const {pageStatus, videosList} = this.state
    const failureImgUrl =
      activeTheme === 'light'
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

    switch (pageStatus) {
      case apiStatusConstants.loading:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )

      case apiStatusConstants.failure:
        return (
          <div className={activeTheme}>
            <img src={failureImgUrl} alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request.
              <br />
              Please try again.
            </p>
            <button type="button" onClick={this.getVideosList}>
              Retry
            </button>
          </div>
        )

      case apiStatusConstants.success:
        return (
          <div className={activeTheme}>
            <div className="hor-card">
              <SiYoutubegaming />
              <h1>Gaming</h1>
            </div>
            <ul className="videos-list">
              {videosList.map(each => (
                <GameItem key={each.id} videoItemDetails={each} />
              ))}
            </ul>
          </div>
        )

      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {activeTheme} = value

          return (
            <div data-testid="gaming">
              <Header />
              <div className={`hor-card ${activeTheme}`}>
                <Sidebar />
                {this.renderPageDetails(activeTheme)}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
