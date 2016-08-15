import { PropTypes } from 'react'
import Comment from './Comment'
Comment.propTypes = {
  text: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likes: PropTypes.number,
  attachments: PropTypes.object,
  isLiked: PropTypes.bool,
  isYourPage: PropTypes.bool.isRequired,
  user: PropTypes.object,
  removeComment: PropTypes.func.isRequired
}

export default Comment
