import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

const VideoItem = props => {
  const {videoItemDetails} = props
  const formattedVideoItemDetails = {
    channel: {
      name: videoItemDetails.channel.name,
      profileImageUrl: videoItemDetails.channel.profile_image_url,
    },
    id: videoItemDetails.id,
    publishedAt: videoItemDetails.published_at,
    thumbnailUrl: videoItemDetails.thumbnail_url,
    title: videoItemDetails.title,
    viewCount: videoItemDetails.view_count,
  }
  const {
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    id,
  } = formattedVideoItemDetails
  const {name, profileImageUrl} = channel

  const distanceToNow = formatDistanceToNow(new Date(publishedAt))

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
              <p>{distanceToNow}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoItem
