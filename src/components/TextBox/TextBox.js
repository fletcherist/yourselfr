import React, { Component, PropTypes } from 'react';
import s from './TextBox.scss';

class TextBox extends Component {
  static propTypes = {
    something: PropTypes.string
  };

  render () {
    return (
      <div
        contentEditable
        className={s.textBox}
        id='text-form'>
      </div>
    );
  }
}

export default TextBox;
