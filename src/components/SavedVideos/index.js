import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoItem from '../VideoItem'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const SavedVideos = () => {
  const renderPageDetails = (activeTheme, savedVideosList) => {
    const videosListLength = savedVideosList.length
    switch (videosListLength === 0) {
      case true:
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
          </div>
        )

      case false:
        return (
          <div className={activeTheme}>
            <div className="hor-card">
              <HiFire />
              <h1>Saved Videos</h1>
            </div>
            <ul className="videos-list">
              {savedVideosList.map(each => (
                <VideoItem key={each.id} videoItemDetails={each} />
              ))}
            </ul>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {activeTheme, savedVideosList} = value
        console.log(savedVideosList, 'SAVED VIDEOS LIST')
        return (
          <div data-testid="savedVideos">
            <Header />
            <div className={`hor-card ${activeTheme}`}>
              <Sidebar />
              {renderPageDetails(activeTheme, savedVideosList)}
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default SavedVideos
