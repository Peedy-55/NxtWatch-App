import Cookies from 'js-cookie'
import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {BiLike, BiDislike} from 'react-icons/bi'
import {RiPlayListAddLine} from 'react-icons/ri'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class VideoItemDetails extends Component {
  state = {
    videoItemDetails: {},
    pageStatus: apiStatusConstants.initial,
    isLiked: false,
    isSaved: false,
  }

  componentDidMount = () => {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({
      pageStatus: apiStatusConstants.loading,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data.video_details)
      const formattedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImgUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      //   console.log(formattedData)
      this.setState({
        pageStatus: apiStatusConstants.success,
        videoItemDetails: formattedData,
      })
    } else {
      this.setState({
        pageStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickSave = updateSavedVideosList => {
    const {videoItemDetails} = this.state
    updateSavedVideosList(videoItemDetails)
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: !prevState.isDisliked,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isLiked,
      isLiked: !prevState.isLiked,
    }))
  }

  renderVideoItemDetails = (
    activeTheme,
    updateSavedVideosList,
    savedVideosList,
  ) => {
    const {pageStatus, videoItemDetails} = this.state
    console.log(videoItemDetails)
    const {
      channel,
      description,
      id,
      publishedAt,
      thumbnailUrl,
      title,
      videoUrl,
      viewCount,
    } = videoItemDetails
    // console.log(channel, pageStatus)
    // console.log(publishedAt)
    // const distanceToNow = formatDistanceToNow(new Date(publishedAt))
    // console.log(videoItemDetails, pageStatus)
    const failureImgUrl =
      activeTheme === 'light'
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    const savedText =
      savedVideosList.findIndex(each => each === videoItemDetails) === -1
        ? 'Save'
        : 'Saved'
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
            <ReactPlayer url={videoUrl} controls />
            <h1>{title}</h1>
            <div className="hor-card">
              <div className="hor-card">
                <p>{viewCount}</p>
                <p>{formatDistanceToNow(new Date(publishedAt))}</p>
              </div>
              <div className="hor-card">
                <div className="hor-card">
                  <button type="button" onClick={this.onClickLike}>
                    <BiLike />
                    <p>Like</p>
                  </button>
                </div>
                <div className="hor-card">
                  <button type="button" onClick={this.onClickDislike}>
                    <BiDislike />
                    <p>Dislike</p>
                  </button>
                </div>
                <div className="hor-card">
                  <button
                    type="button"
                    onClick={() => this.onClickSave(updateSavedVideosList)}
                  >
                    <RiPlayListAddLine />
                    <p>{savedText}</p>
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="hor-card">
              <img src={channel.profileImgUrl} alt="channel logo" />
              <div>
                <p>{channel.name}</p>
                <p>{channel.subscriberCount}</p>
                <p>{description}</p>
              </div>
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
          const {activeTheme, updateSavedVideosList, savedVideosList} = value

          return (
            <div data-testid="videoItemDetails">
              <Header />
              <div className={`hor-card ${activeTheme}`}>
                <Sidebar />
                {this.renderVideoItemDetails(
                  activeTheme,
                  updateSavedVideosList,
                  savedVideosList,
                )}
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
