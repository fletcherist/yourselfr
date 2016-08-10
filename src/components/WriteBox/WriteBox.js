import React, { Component, PropTypes } from 'react'
import s from './WriteBox.scss'
import { connect } from 'react-redux'
import { actions as postsActions } from '../../store/modules/posts'
// import AttachPhoto from './AttachPhoto'
// import TextBox from '../TextBox'
// import SmileBox from '../SmileBox'
// import { isValidPhoto } from 'components/Toools'

import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import SendIcon from 'material-ui/svg-icons/content/send'

import { palette } from 'store/config'

class WriteBox extends Component {
  static propTypes = {
    sendPost: PropTypes.func.isRequired,
    alias: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    isYourPage: PropTypes.bool.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      username: undefined,
      text: '',
      created_by: undefined,
      isOpen: false,
      photo: undefined
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      username: props.username,
      created_by: props.alias,
      text: '',
      isOpen: props.isOpen || false
    })
  }

  focusHandler () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && e.metaKey) {
        this.handleSubmitButton(e)
      }
    })
  }

  blurHandler () {
    document.removeEventListener('keydown', () => {})
  }

  handleSubmitButton (e) {
    console.log(this.textField)
    var text = this.textField.getValue()
    var photo = false
    if (/^\s+$/.test(text) || !text) {
      return this.textField.input.refs.input.focus()
    }

    this.props.sendPost(text, photo)

    this.setState({text: ''})

    setTimeout(() => {
      return this.textField.input.refs.input.focus()
    }, 200)
    // preview.src = ''
    // attachBlock.classList.add('hidden')
  }

  updateValue (e) {
    this.setState({text: e.target.value})
  }

  render () {
    return (
      <div>
        <TextField
          style={{margin: 0, padding: 0}}
          textareaStyle={{paddingLeft: 15, paddingBottom: 0}}
          hintStyle={{paddingLeft: 15}}
          underlineStyle={{bottom: 0}}
          hintText='Что ты думаешь обо мне?'
          defaultValue=''
          autoFocus fullWidth multiLine
          value={this.state.text}
          onChange={(e) => this.updateValue(e)}
          onFocus={this.focusHandler.bind(this)}
          onBlur={this.blurHandler.bind(this)}
          ref={(r) => this.textField = r}
        />
        <div className={s.actions}>
          <IconButton
            onClick={this.handleSubmitButton.bind(this)}>
            <SendIcon
              color={palette.yoColor}
            />
          </IconButton>
        </div>
      </div>
    )
  }
}

// <SmileBox />

const GreetingHeader = ({username, photo}) => (
  <div className={s.header}>
    <div className={s.right}>
      <div className={s.greeting}>{username}</div>
      <div className={s.action}>Расскажи обо мне.</div>
    </div>
  </div>
)

function mapStateToProps (state) {
  return {
    alias: state.user.alias,
    username: state.user.username,
    photo: state.user.photo,
    isYourPage: state.auth.isYourPage
  }
}

export default connect(mapStateToProps, postsActions)(WriteBox)
