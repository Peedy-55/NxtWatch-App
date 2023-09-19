import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

const VideoItem = props => {
  const {videoItemDetails} = props

  const {
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    id,
  } = videoItemDetails
  const {name, profileImageUrl} = channel

  //   const distanceToNow = formatDistanceToNow(new Date(publishedAt))

  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div className="hor-card">
          <img src={profileImageUrl} alt="channel logo" />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <div className="hor-card">
              <p>{viewCount}</p>
              <p>{formatDistanceToNow(new Date(publishedAt))}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
