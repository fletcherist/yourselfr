import React, { Component } from 'react'
import s from './SmileBox.scss'

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
]

class SmileBox extends Component {
  componentWillMount () {
    this.setState({
      style: {}
    })
  }
  showBox () {
    this.setState({
      style: {visibility: 'visible', display: 'block'}
    })
  }
  hideBox () {
    this.setState({
      style: {visibility: 'hidden', display: 'none'}
    })
    var self = this
    setTimeout(() => {
      self.setState({
        style: {display: 'block'}
      })
    }, 500)
  }
  addSmile (smile) {
    var textForm = document.getElementById('text-form')
    textForm.innerHTML = textForm.innerHTML + smile + ' '
    this.hideBox()
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

export default SmileBox
