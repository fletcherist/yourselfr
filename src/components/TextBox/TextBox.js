import React, { Component, PropTypes } from 'react';
import s from './TextBox.scss';
// import generatePhrase from './generatePhrase';
import { focusDiv } from '../Toools';

class TextBox extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.username !== this.props.username;
  }
  componentWillMount () {
    this.setState({
      opacity: {
        opacity: 0.5,
        display: 'block'
      },
      focused: false
    });
  }

  boxFocus () {
    if (this.state.focused) {
      return false;
    }
    this.setState({
      opacity: {
        opacity: 1,
        display: 'none'
      },
      focused: true
    });
    this.forceUpdate();
  }
  componentDidMount () {
    setTimeout(() => {
      focusDiv(document.querySelector('#text-form'));
    }, 100);
    document.onkeypress = () => {
      if (!this.state.focused) {
        this.boxFocus();
      }
    }
  }
  render () {
    const placeholder =
      <div style={this.state.opacity} className={s.placeHolder}>
        {this.state.display === 'block' && (
          <span>Мнение о @{this.props.alias}</span>
        )}
      </div>
    return (
      <div className={s.wrap}>
        <div
          contentEditable
          suppressContentEditableWarning
          className={s.textBox}
          id='text-form'
          onMouseDown={this.boxFocus.bind(this)}
          autoFocus
          spellCheck={false}>
          {placeholder}
        </div>
      </div>
    );
  }
}

export default TextBox;
