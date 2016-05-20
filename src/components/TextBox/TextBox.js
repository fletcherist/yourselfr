import React, { Component, PropTypes } from 'react';
import s from './TextBox.scss';
import generatePhrase from './generatePhrase';

class TextBox extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  };
  // shouldComponentUpdate (nextProps) {
  //   return nextProps.username !== this.props.username;
  // }
  componentWillMount () {
    this.setState({
      opacity: {
        opacity: 0.5
      },
      text: generatePhrase(this.props.username)
    });
  }

  boxFocus () {
    this.setState({
      opacity: {
        opacity: 1
      },
      text: ''
    })
  }
  render () {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        className={s.textBox}
        id='text-form'
        style={this.state.opacity}
        onClick={this.boxFocus.bind(this)}>
        {this.state.text}
      </div>
    );
  }
}

export default TextBox;
