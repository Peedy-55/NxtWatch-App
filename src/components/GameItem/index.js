import {Link} from 'react-router-dom'

const GameItem = props => {
  const {videoItemDetails} = props
  const formattedVideoItemDetails = {
    id: videoItemDetails.id,
    thumbnailUrl: videoItemDetails.thumbnail_url,
    title: videoItemDetails.title,
    viewCount: videoItemDetails.view_count,
  }
  const {thumbnailUrl, title, viewCount, id} = formattedVideoItemDetails

  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <p>{title}</p>
        <p>{`${viewCount} Watching Worldwide`}</p>
      </li>
    </Link>
  )
}

export default GameItem
