import React, { Component, PropTypes } from 'react'
import s from '../Post/Post.scss'
import cx from 'classnames/bind'
import { Link } from 'react-router'
import { isHot, isValidPhoto } from '../Toools'

import UserAvatar from '../Post/UserAvatar'
import TickTime from '../Post/TickTime'
import Like from '../Like'

import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'

import { blue300, indigo900 } from 'material-ui/styles/colors'

const styles = {
  chip: {
    margin: 8,
    marginLeft: 40,
    maxWidth: 350,
    whiteSpace: 'wrap',
    wordWrap: 'break-word'
  },
  label: {
    whiteSpace: 'wrap',
    lineHeight: '20px',
    marginTop: '5px',
    marginBottom: '5px'
  }
}
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
    user: PropTypes.object,
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
    let { text, created_at, id, likes, isLiked, isYourPage } = this.props
    if (!this.state.deleted) {
      return (
        <div>
          <Chip style={styles.chip} labelStyle={styles.label}
            onRequestDelete={
              isYourPage
                ? this.removeComment.bind(this, id)
                : undefined}>
            {this.avatar()}
            <span className={s.commentTime}>
              <TickTime time={created_at} />
            </span>
            {text}
          </Chip>
        </div>
      )
    }
    return null
  }

  avatar () {
    let { user } = this.props
    if (user && user.photo) {
      return (
        <Avatar
          src={isValidPhoto(user.photo)}
          color={blue300} backgroundColor={indigo900} />
      )
    }
    return (
      <Avatar
        color={blue300} backgroundColor={indigo900} size={10}>
        YO
      </Avatar>
    )
  }

  // <div className={postClasses}>
  //   <div className={s.time}>
  //     {this.removeButton()}
  //   </div>
  //   <UserAvatar
  //     photo={user.photo}
  //     alias={user.alias}
  //     loadUser={loadUser}
  //   />
  //   <div className={ccx(s.text, s.commentText)}>
  //     <div className={s.commentTime}>
  //       <Link
  //         onClick={() => loadUser(user.alias)}
  //         className={s.commentAuthor}
  //         to={`/${user.alias}`}>
  //         {user.username}
  //       </Link>
  //       {' '}
  //       <TickTime time={created_at} />
  //     </div>
  //     <span dangerouslySetInnerHTML={{__html: text}}></span>
  //   </div>
  //   <Like
  //     count={likes}
  //     object={id}
  //     isLiked={isLiked}
  //     type='comment'
  //   />
  // </div>
}
export default Comment
