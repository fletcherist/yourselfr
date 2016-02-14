import React from 'react';
import Like from '../Like';

import s from './Post.scss';
import cx from 'classnames/bind';
import { config } from '../../redux/config';

class Post extends React.Component {
    constructor (props) {
      super(props);
      this.displayName = '';

      this.state = {
        created_at: this.props.created_at,
        createdPronounce: 'сейчас',
        isHot: false
      }
    }

    tickTime () {
      var time = new Date(this.state.created_at);

      var now = new Date();

      var passed = ((now - time) / 1000).toFixed(0); // Seconds
      var result;
      if (passed < 5) {
        result = 'сейчас'
      } else if (passed < 60) {
        result = passed + 'сек'
      } else if (passed < 60 * 60) {
        result = (passed / 60).toFixed(0) + 'мин';
      } else if (passed < 60 * 60 * 24) {
        result = (passed / (60 * 60)).toFixed(0) + 'ч'
      } else if (passed < 60 * 60 * 24 * 7) {
        result = (passed / (60 * 60 * 24)).toFixed(0) + 'дн'
      } else if (passed < 60 * 60 * 24 * 7 * 4) {
        result = (passed / (60 * 60 * 24 * 7)).toFixed(0) + 'нед'
      } else if (passed < 60 * 60 * 24 * 7 * 4 * 12) {
        result = (passed / (60 * 60 * 24 * 7 * 4)).toFixed(0) + 'мес'
      } else if (passed < 60 * 60 * 24 * 7 * 30 * 12) {
        result = 'давно'
      }

      // posts, posted <5s ago will show coloured.
      var isHot = false;
      if (passed < 5) {
        isHot = true;
      }

      this.setState({
        createdPronounce: result,
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

      return (
        <div className={postClasses}>
                <div className={s.time}>
                    <span>{this.state.createdPronounce}</span>
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
  attachments: React.PropTypes.object
}

export default Post;
