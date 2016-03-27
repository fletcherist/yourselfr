import React from 'react';
import Like from '../Like';

import s from '../Post/Post.scss';
import cx from 'classnames/bind';
import { connect } from 'react-redux';
import { actions as postsActions } from '../../redux/modules/posts';
import { timePassed } from '../Toools';

import { UserAvatar } from '../Post/UserAvatar';

let ccx = cx.bind(s);
class Comment extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        created_at: this.props.created_at,
        createdPronounce: 'сейчас',
        isHot: false,
        updateTimer: false,
        isLiked: this.props.isLiked
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
      this.loadInterval = setInterval(this.tickTime.bind(this), 1000);
    }
    componentWillUnmount () {
      this.loadInterval && clearInterval(this.loadInterval);
      this.loadInterval = false;
    }
    componentWillMount () {
      this.tickTime();
    }

    render () {
      let postClasses = ccx({
        post: true,
        comment: true,
        hot: this.state.isHot,
        isLiked: this.state.isLiked
      })

      return (
        <div>
            <div className={postClasses}>
              <UserAvatar photo={this.props.user.photo} alias={this.props.user.alias}/>
              <span className={ccx({
                hideOnHover: this.props.isYourPage})
              }>{this.state.createdPronounce}</span>
              <div className={s.text}>
                  <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
              </div>
              <Like
                  count={this.props.likes}
                  object={this.props.id}
              />
            </div>
      </div>
      );
    }
}

Comment.propTypes = {
  text: React.PropTypes.string.isRequired,
  created_at: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  likes: React.PropTypes.number,
  attachments: React.PropTypes.object,
  isLiked: React.PropTypes.bool,
  isYourPage: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object.isRequired

  // removePost: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isYourPage: state.auth.isYourPage
  }
}
export default connect(mapStateToProps, postsActions)(Comment);
