import React, { Component, PropTypes } from 'react';
import s from './Post.scss';

class PostText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  render () {
    var formattedText = {
      fontSize: this.props.text.length > 100 ? '13px' : '16px'
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
