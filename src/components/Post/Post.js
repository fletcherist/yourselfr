import React from 'react';
import Like from '../Like';

import s from './Post.scss';
import cx from 'classnames/bind';
import { config } from '../../redux/config';
import { connect } from 'react-redux';
import { actions as postsActions } from '../../redux/modules/posts';
import { timePassed } from '../Toools';

class Post extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        created_at: this.props.created_at,
        createdPronounce: 'сейчас',
        isHot: false,
        updateTimer: false
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
      let ccx = cx.bind(s);
      let postClasses = ccx({
        post: true,
        hot: this.state.isHot
      })

      var isPhoto;
      this.props.attachments &&
      this.props.attachments.photo &&
      this.props.attachments.photo !== 'undefined' ? isPhoto = true : isPhoto = false

      return (
        <div className={postClasses}>
                <div className={s.time}>
                    <span className={s.hideOnHover}>{this.state.createdPronounce}</span>
                    <div className={s.removeButton} onClick={ () => this.props.removePost(this.props.id)}></div>
                </div>
                <div className={s.text}>
                    <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
                    {isPhoto && (
                      <div>
                        <img src={`${config.http}/upload/photo/${this.props.attachments.photo}`}
                            className={s.attachmentPhoto}
                        />
                      </div>
                    )}
                </div>
                <Like
                    count={this.props.likes}
                    object={this.props.id}
                />
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

  removePost: React.PropTypes.func.isRequired
}

const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, postsActions)(Post);
