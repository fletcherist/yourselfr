import React, { Component, PropTypes } from 'react'
import s from '../Post/Post.scss'
import cx from 'classnames/bind'
import { Link } from 'react-router'
import { isHot } from '../Toools'

import UserAvatar from '../Post/UserAvatar'
import TickTime from '../Post/TickTime'
import Like from '../Like'

let ccx = cx.bind(s)
class Comment extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    likes: PropTypes.number,
    attachments: PropTypes.object,
    isLiked: PropTypes.bool,
    isYourPage: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    loadUser: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired
  };
  constructor (props) {
    super(props)
    this.state = {
      isHot: isHot(this.props.created_at),
      deleted: false
    }
  }

  shouldComponentUpdate (nextProps) {
    return true
  }

  removeComment (id) {
    this.props.removeComment(id)
    this.setState({deleted: true})
  }

  render () {
    let postClasses = ccx({
      post: true,
      comment: true,
      hot: this.state.isHot,
      isLiked: this.state.isLiked
    })
    const { text, created_at, id, likes, isLiked, user, loadUser } = this.props

    if (this.state.deleted === false) {
      return (
        <div>
          <div className={postClasses}>
            <div className={s.time}>
              {this.props.isYourPage && (
                <div className={s.removeButton} onClick={this.removeComment.bind(this, id)}></div>
              )}
            </div>
            <UserAvatar photo={user.photo} alias={user.alias} loadUser={loadUser} />
            <div className={ccx(s.text, s.commentText)}>
              <div className={s.commentTime}>
                <Link onClick={() => loadUser(user.alias)} className={s.commentAuthor} to={`/${user.alias}`}>
                  {user.username}
                </Link>
                {' '}
                <TickTime time={created_at} />
              </div>
              <span dangerouslySetInnerHTML={{__html: text}}></span>
            </div>
            <Like
              count={likes}
              object={id}
              isLiked={isLiked}
              type='comment'
            />
          </div>
        </div>
      )
    } else {
      return (<div className={s.removeComment}>Комментарий был успешно удалён.</div>)
    }
  }
}
export default Comment
