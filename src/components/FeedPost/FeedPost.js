import React, { Component, PropTypes } from 'react'

import s from 'components/Post/Post.scss'
import cx from 'classnames/bind'
// import { config } from '../../store/config';
import TickTime from '../Post/TickTime'
import PostText from '../Post/PostText'
import PhotopostFeed from 'components/Photopost/PhotopostFeed'
import { Link } from 'react-router'
import { isValidPhoto } from 'components/Toools'

let ccx = cx.bind(s)
class FeedPost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHot: false
    }
  }

  render () {
    let postClasses = ccx({
      post: true,
      hot: this.state.isHot
    })

    var isPhoto =
        (this.props.attachments &&
        this.props.attachments.photo)
    const { username, alias } = this.props.user
    return (
      <div className={s.postOne}>
        {!isPhoto && (
          <div className={postClasses}>
            <div className={s.time}>
              <Link to={`/${alias}`}>
                <img src={isValidPhoto(this.props.user.photo)} className={s.photo} />
              </Link>
            </div>
            <div className={s.text}>
              <div>
                <span className={s.time}>
                  <TickTime time={this.props.created_at} />{' '} назад о
                </span>
                {' '}
                <Link to={`/${alias}`}><b>{username}</b></Link>
              </div>
              <div className={s.feedText}>
                <PostText text={this.props.text} />
              </div>
            </div>
          </div>
        )}
        {isPhoto && (
          <PhotopostFeed
            id={this.props.id}
            photo={this.props.attachments.photo}
            text={this.props.text}
            alias={this.props.user.alias}
            attachmentsPhoto={this.props.user.photo}
          />
        )}
      </div>
    )
  }
}

FeedPost.propTypes = {
  text: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likes: PropTypes.number,
  attachments: PropTypes.object,
  user: PropTypes.object.isRequired
}
export default FeedPost
