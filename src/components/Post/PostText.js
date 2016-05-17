import React, { Component, PropTypes } from 'react';
import s from './Post.scss';

class PostText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }
  render () {
    var formattedText = {
      fontSize: this.props.text.length > 100 ? '16px' : '16px'
    }
    return (
      <span
        className={s.text}
        style={formattedText}
        dangerouslySetInnerHTML={{__html: this.props.text}}>
      </span>
    );
  }
}

export default PostText;
