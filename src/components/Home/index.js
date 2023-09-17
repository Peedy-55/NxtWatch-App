import Popup from 'reactjs-popup'
import {Component} from 'react'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoItem from '../VideoItem'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    pageStatus: apiStatusConstants.initial,
    videosList: [],
    searchInput: '',
  }

  componentDidMount = () => {
    this.getVideosList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getVideosList = async () => {
    this.setState({
      pageStatus: apiStatusConstants.loading,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
    const {pageStatus, videosList, searchInput} = this.state
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
            <Popup open className="popup-content">
              {close => (
                <>
                  <div className="hor-card">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                    />
                    <button type="button" onClick={() => close()}>
                      <AiOutlineClose />
                    </button>
                  </div>
                  <p>
                    Buy Nxt Watch Premium prepaid plans with <br />
                    UPI
                  </p>
                  <button type="button">GET IT NOW</button>
                </>
              )}
            </Popup>
            <div>
              <div className="hor-card">
                <input
                  type="search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <AiOutlineSearch />
              </div>
              <ul className="videos-list">
                {videosList.map(each => (
                  <VideoItem key={each.id} videoItemDetails={each} />
                ))}
              </ul>
            </div>
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
            <>
              <Header />
              <div className={`hor-card ${activeTheme}`}>
                <Sidebar />
                {this.renderPageDetails(activeTheme)}
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
