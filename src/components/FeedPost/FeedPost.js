import React, { Component, PropTypes } from 'react';

import s from './FeedPost.scss';
import cx from 'classnames/bind';
import { config } from '../../redux/config';
import { isValidPhoto } from '../Toools';
import { Link } from 'react-router';
import TickTime from '../Post/TickTime';
import PostText from '../Post/PostText';

let ccx = cx.bind(s);
class FeedPost extends Component {
    static propTypes = {
      text: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      likes: PropTypes.number,
      attachments: PropTypes.object,
      user: PropTypes.object.isRequired
    };

    constructor (props) {
      super(props);
      this.displayName = '';
      this.state = {
        isHot: false
      }
    }

    render () {
      let postClasses = ccx({
        post: true,
        hot: this.state.isHot
      })

      var isPhoto;
      this.props.attachments &&
      this.props.attachments.photo &&
      this.props.attachments.photo !== 'undefined' ? isPhoto = true : isPhoto = false

      var photo = isValidPhoto(this.props.user.photo);
      var linkHref = '/' + this.props.user.alias;

      return (
        <div className={s.postOne}>
          {!isPhoto && (
            <div className={postClasses}>
                    <div className={s.time}>
                        <Link to={linkHref}>
                          <img src={photo} className={s.photo}/>
                        </Link>
                    </div>
                    <div className={s.text}>
                        <div>
                          <span className={s.time}>
                            <TickTime time={this.props.created_at}/>{' '} назад о
                          </span>
                          {' '}
                          <Link to={linkHref}><b>{this.props.user.username}</b></Link>
                        </div>
                        <PostText text={this.props.text}/>
                    </div>
              </div>
          )}
          {isPhoto && (
            <div className={s.photoPost} style={{background: `url(${config.http}/upload/photo/${this.props.attachments.photo})`}}>
                <div className={s.photoAvatar}>
                    <Link to={linkHref}>
                      <img
                        src={photo}
                        className={s.photo}/>
                    </Link>
                </div>
                <div className={s.photoText}>
                  <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
                </div>
            </div>
          )}
        </div>
      );
    }
}
export default FeedPost;
