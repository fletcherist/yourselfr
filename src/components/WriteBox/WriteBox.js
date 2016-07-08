import React, { Component, PropTypes } from 'react';
import s from './WriteBox.scss';
import { connect } from 'react-redux';
import { actions as postsActions } from '../../store/modules/posts';
import Modal from 'react-modal';
import AttachPhoto from './AttachPhoto';
import ModalStyles from './ModalStyles.js';
import TextBox from '../TextBox';
import SmileBox from '../SmileBox';
import { isValidPhoto } from 'components/Toools';

class WriteBox extends Component {
  static propTypes = {
    sendPost: PropTypes.func.isRequired,
    alias: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    isYourPage: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    toggleModalBox: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
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
    });
  }

  handleSubmitButton (e) {
    var textBox = document.querySelector('#text-form')
    var photo = document.querySelector('#input-value').value;
    var preview = document.querySelector('#attach-preview');
    var attachBlock = document.querySelector('#attach-block');
    var text = textBox.textContent;
    console.log(text);
    if (!photo && !text) {
      textBox.focus();
    }
    if (/^\s+$/.test(text)) {
      return textBox.focus();
    }
    this.props.sendPost(text, photo);
    textBox.value = '';
    preview.src = '';
    attachBlock.classList.add('hidden')
    this.props.toggleModalBox();
  }

  render () {
    return (
      <Modal
        isOpen={this.props.isOpen}
        style={ModalStyles}
        onRequestClose={this.props.toggleModalBox}
        closeTimeoutMS={300}>
        <div className={s.container}>
          <GreetingHeader
            username={this.props.username}
            photo={this.props.photo}
          />
          <TextBox username={this.props.username} alias={this.props.alias} />
          <div id='attach-block' className='hidden'>
            <div className={s.plus}>+</div>
            <img id='attach-preview' className={s.attachPreview} />
          </div>
          <div className={s.additional}>
            <AttachPhoto />
            <div
              className={s.buttonSubmit}
              onClick={this.handleSubmitButton.bind(this)}>
              Отправить
            </div>
          </div>
        </div>
      </Modal>);
  }
}

// <SmileBox />

const GreetingHeader = ({username, photo}) => (
  <div className={s.header}>
    <div className={s.left}>
      <img src={isValidPhoto(photo)} className={s.avatar} />
    </div>
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

export default connect(mapStateToProps, postsActions)(WriteBox);
