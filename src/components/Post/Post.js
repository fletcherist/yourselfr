import React, { Component, PropTypes } from 'react'
import Like from '../Like'

import s from './Post.scss'
import cx from 'classnames/bind'
import CommentForm from '../CommentForm'
import Photopost from '../Photopost'
import TickTime from './TickTime'
import PostText from './PostText'
import Comments from '../Comments'

import { isHot } from '../Toools'

let ccx = cx.bind(s)
class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHot: isHot(this.props.created_at),
      showCommentForm: false
    }
  }

  render () {
    let postClasses = ccx({
      post: true,
      hot: this.state.isHot,
      isLiked: this.state.isLiked
    })

    var isPhoto =
        (this.props.attachments &&
        this.props.attachments.photo)
    return (
      <div className={s.first}>
        {!isPhoto && (
          <div
            className={postClasses}
            onClick={this.openCommentForm.bind(this)}>
            <div className={s.time}>
              <span className={ccx({hideOnHover: this.props.isYourPage})}>
                <TickTime time={this.props.created_at} />
              </span>
              {this.renderRemoveButton()}
            </div>
            <PostText text={this.props.text} />
            <Like
              count={this.props.likes}
              object={this.props.id}
              isLiked={this.props.isLiked}
              type='post'
            />
          </div>
        )}
        {this.renderPhotopost()}
        <Comments
          comments={this.props.comments}
          isYourPage={this.props.isYourPage}
        />
        {this.renderCommentForm()}
      </div>
      )
  }
  openCommentForm () {
    this.setState({
      showCommentForm: !this.state.showCommentForm
    })
    this.forceUpdate()
  }

  renderRemoveButton () {
    if (this.props.isYourPage) {
      return (
        <div className={s.removeButton}
          onClick={() => this.props.removePost(this.props.id)}>
        </div>
      )
    }
    return null
  }

  renderPhotopost () {
    var isPhoto =
        (this.props.attachments &&
        this.props.attachments.photo)

    if (isPhoto) {
      return (
        <Photopost
          id={this.props.id}
          isYourPage={this.props.isYourPage}
          removePost={this.props.removePost}
          photo={this.props.attachments.photo}
          text={this.props.text}
        />
      )
    }
    return null
  }

  renderCommentForm () {
    if (this.state.showCommentForm) {
      return (
        <CommentForm postId={this.props.id} />
      )
    }
    return null
  }
}

Post.propTypes = {
  text: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likes: PropTypes.number,
  attachments: PropTypes.object,
  isLiked: PropTypes.bool,
  comments: PropTypes.array,
  isYourPage: PropTypes.bool.isRequired,
  removePost: React.PropTypes.func.isRequired
}

export default Post
