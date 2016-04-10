import React from 'react';
import Like from '../Like';
import Comment from '../Comment';

import s from './Post.scss';
import cx from 'classnames/bind';
import { config } from '../../redux/config';
import { connect } from 'react-redux';
import { actions as postsActions } from '../../redux/modules/posts';
import { timePassed } from '../Toools';
import { isEmpty } from '../toools';
import CommentForm from '../Comment/CommentForm';

let ccx = cx.bind(s);
class Post extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        created_at: this.props.created_at,
        createdPronounce: 'сейчас',
        isHot: false,
        updateTimer: false,
        isLiked: this.props.isLiked,
        showCommentForm: false
      }

      this.timePassed = timePassed;
    }

    tickTime (flag) {
      var time = new Date(this.state.created_at);
      var timePassed = this.timePassed(time);
      // posts, posted <5s ago will show coloured.
      var isHot = false;
      if (timePassed.seconds < 60) {
        isHot = true;
      }
      this.setState({
        createdPronounce: timePassed.pronounce,
        isHot: isHot
      })
    }
    componentDidMount () {
      this.loadInterval = setInterval(this.tickTime.bind(this), 10000);
    }
    componentWillUnmount () {
      this.loadInterval && clearInterval(this.loadInterval);
      this.loadInterval = false;
    }
    componentWillMount () {
      this.tickTime();
    }

    openCommentForm () {
      this.setState({
        showCommentForm: !this.state.showCommentForm
      })
    }
    render () {
      let postClasses = ccx({
        post: true,
        hot: this.state.isHot,
        isLiked: this.state.isLiked
      })

      var isPhoto;
      this.props.attachments &&
      this.props.attachments.photo &&
      this.props.attachments.photo !== undefined ? isPhoto = true : isPhoto = false

      var comments = this.props.comments;
      var commentsArray;
      if (comments && !isEmpty(comments) && Array.isArray(comments)) {
        commentsArray = comments.map(function (comment) {
          return (
            <Comment
              key={comment._id}
              id={comment._id}
              text={comment.text}
              created_at={comment.created_at}
              user={comment.user}
              isLiked={comment.isLiked}
            />
          )
        });
      }
      return (
        <div className={s.first}>
          {!isPhoto && (
            <div className={postClasses} onDoubleClick={ this.openCommentForm.bind(this) }>
              <div className={s.time}>
                  <span className={ccx({
                    hideOnHover: this.props.isYourPage})
                  }>{this.state.createdPronounce}</span>
                  {this.props.isYourPage && (
                      <div className={s.removeButton} onClick={ () => this.props.removePost(this.props.id)}></div>
                  )}
              </div>
              <div className={s.text}>
                  <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
              </div>
              <Like
                  count={this.props.likes}
                  object={this.props.id}
              />
            </div>
        )}
        {isPhoto && (
          <div className={s.photoPost} style={{background: `url(${config.http}/upload/photo/${this.props.attachments.photo})`}}>
              {this.props.isYourPage && (
                <div className={s.removePhotoPost} onClick={ () => this.props.removePost(this.props.id)}></div>
              )}
              <div className={s.photoText}>
                <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
              </div>
          </div>
        )}
        {commentsArray && (
          <div>
            {commentsArray}
            <CommentForm post_id={this.props.id}/>
          </div>
        )}
        {this.state.showCommentForm && (
          <CommentForm post_id={this.props.id}/>
        )}
      </div>
      );
    }
}

Post.propTypes = {
  text: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  likes: React.PropTypes.number,
  attachments: React.PropTypes.object,
  isLiked: React.PropTypes.bool,
  comments: React.PropTypes.array,
  isYourPage: React.PropTypes.bool.isRequired,

  removePost: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isYourPage: state.auth.isYourPage
  }
}
export default connect(mapStateToProps, postsActions)(Post);
