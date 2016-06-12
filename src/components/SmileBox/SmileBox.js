import React, { Component, PropTypes } from 'react';
import s from './SmileBox.scss';

const smiles = [
  '😀', '😬', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😉', '😊', '🙂',
  '😋', '😌', '😍', '😘', '😗', '😙', '😚', '😜', '😝', '😛', '🤑', '🤓',
  '😎', '🤗', '😏', '😶', '😐', '😑', '😒', '🙄', '🤔', '😳', '😞', '😟',
  '😠', '😡', '😔', '😕', '😣', '😖', '😫', '😩', '😤', '😮', '😱', '😨',
  '😰', '😯', '😦', '😧', '😢', '😥', '😪', '😓', '😭', '😲', '🤐', '😷',
  '🤒', '🤕', '😴', '💤', '💩', '😈', '👿', '👹', '👺', '💀', '👻', '👽',
  '🤖', '😺', '😸', '😹', '😻', '😽', '🙀', '😿', '😾', '🙌', '👏', '👋',
  '👍', '👊', '✊', '👌', '✋', '💪', '🙏', '👆', '👇', '👈', '👉', '🖕',
  '🤘', '💅'
];

class SmileBox extends Component {
  componentWillMount () {
    this.setState({
      style: {}
    })
  }
  showBox () {
    console.log('showBox');
    this.setState({
      style: {visibility: 'visible'}
    });
  }
  hideBox () {
    console.log('asddassadsd');
    this.setState({
      style: {visibility: 'hidden'}
    });
  }
  addSmile (smile) {
    var textForm = document.getElementById('text-form');
    textForm.innerHTML = textForm.innerHTML + smile + ' ';
    this.hideBox();
  }
  render () {
    return (
      <div>
        <div className={s.button} onMouseOver={() => this.showBox()}></div>
        <div className={s.list} style={this.state.style}>
          {smiles.map((smile) => {
            return (
              <div
                className={s.smile}
                onClick={() => this.addSmile(smile)}
                key={smile}>
                {smile}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SmileBox;
