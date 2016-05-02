import React, { Component, PropTypes } from 'react';
import Like from '../Like';
// import Comment from '../Comment';

import s from './Post.scss';
import cx from 'classnames/bind';
// import { config } from '../../redux/config';
// import CommentForm from '../Comment/CommentForm';
import Photopost from '../Photopost';
import TickTime from './TickTime';

let ccx = cx.bind(s);
class Post extends Component {
    static propTypes = {
      text: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      likes: PropTypes.number,
      attachments: PropTypes.object,
      isLiked: PropTypes.bool,
      comments: PropTypes.array,
      isYourPage: PropTypes.bool.isRequired,
      removePost: React.PropTypes.func.isRequired
    };
    constructor (props) {
      super(props);
      this.state = {
        created_at: this.props.created_at,
        createdPronounce: 'сейчас',
        isHot: false,
        showCommentForm: false
      }
    }

    componentWillUpdate (nextProps) {
      return false;
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

      // var comments = this.props.comments;
      // var commentsArray;
      // if (comments && !isEmpty(comments) && Array.isArray(comments)) {
      //   commentsArray = comments.map(function (comment) {
      //     return (
      //       <Comment
      //         key={comment._id}
      //         id={comment._id}
      //         text={comment.text}
      //         created_at={comment.created_at}
      //         user={comment.user}
      //         isLiked={comment.isLiked}
      //       />
      //     )
      //   });
      // }
      return (
        <div className={s.first}>
          {!isPhoto && (
            <div className={postClasses} onClick={ this.openCommentForm.bind(this) }>
              <div className={s.time}>
                  <span className={ccx({hideOnHover: this.props.isYourPage})}>
                    <TickTime time={this.props.created_at}/>
                  </span>
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
                  isLiked={this.props.isLiked}
              />
            </div>
        )}
        {isPhoto && (
          <Photopost
            id={this.props.id}
            isYourPage={this.props.isYourPage}
            removePost={this.props.removePost}
            photo={this.props.attachments.photo}
            text={this.props.text}
          />
        )}
        {
          // {commentsArray && (
          //   // <div>
          //   //   {commentsArray}
          //   //   <CommentForm post_id={this.props.id}/>
          //   // </div>
          // )}
          //
          // {this.state.showCommentForm && (
          //   // <CommentForm post_id={this.props.id}/>
          // )}
        }
      </div>
      );
    }
}

export default Post;
