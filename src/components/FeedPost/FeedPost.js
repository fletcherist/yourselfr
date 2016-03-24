import React from 'react';

import s from './FeedPost.scss';
import cx from 'classnames/bind';
import { config } from '../../redux/config';
import { isValidPhoto, timePassed } from '../Toools';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as postsActions } from '../../redux/modules/posts';

class Post extends React.Component {
    constructor (props) {
      super(props);
      this.displayName = '';

      this.state = {
        created_at: this.props.created_at,
        createdPronounce: 'сейчас',
        isHot: false
      }

      this.timePassed = timePassed;
    }

    tickTime (flag) {
      var time = new Date(this.state.created_at);
      var timePassed = this.timePassed(time);
      // posts, posted <5s ago will show coloured.
      var isHot = false;
      if (timePassed.seconds < 5) {
        isHot = true;
      }
      this.setState({
        createdPronounce: timePassed.pronounce,
        isHot: isHot
      })
    }
    componentDidMount () {
      this.loadInterval = setInterval(this.tickTime.bind(this), 1000);
      // setInterval(this.tickTime.bind(this), 1000);
    }
    componentWillUnmount () {
      this.loadInterval && clearInterval(this.loadInterval);
      this.loadInterval = false;
    }
    componentWillMount () {
      this.tickTime();
    }

    render () {
      let ccx = cx.bind(s);
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
        <div>
          {!isPhoto && (
            <div className={postClasses}>
                    <div className={s.time}>
                        <Link to={linkHref}>
                          <img
                            src={photo}
                            className={s.photo}/>
                        </Link>
                    </div>
                    <div className={s.text}>
                        <div>
                          <span className={s.time}>{this.state.createdPronounce} назад о</span>
                          {' '}
                          <Link to={linkHref}><b>{this.props.user.username}</b></Link>
                        </div>
                        <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
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

Post.propTypes = {
  text: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  likes: React.PropTypes.number,
  attachments: React.PropTypes.object,
  user: React.PropTypes.object.isRequired
}

const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, postsActions)(Post);
