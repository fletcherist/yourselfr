import React, { Component, PropTypes } from 'react';
import s from './WriteBox.scss';
import { connect } from 'react-redux';
import { actions as postsActions } from '../../store/modules/posts';
import Modal from 'react-modal';
import AttachPhoto from './AttachPhoto';
import ModalStyles from './ModalStyles.js';
import TextBox from '../TextBox';

class WriteBox extends Component {
  static propTypes = {
    sendPost: PropTypes.func.isRequired,
    alias: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
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
    })
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
          <div className={s.header}>Написать анонимное мнение</div>
          <TextBox username={this.props.username} />
          <div id='attach-block' className='hidden'>
            <div className={s.plus}>+</div>
            <img id='attach-preview' className={s.attachPreview} />
          </div>
          <div className={s.above}>
            <div
              className={s.buttonSubmit}
              onClick={this.handleSubmitButton.bind(this)}>
              Отправить
            </div>
            <AttachPhoto />
          </div>
        </div>
      </Modal>);
  }
}

function mapStateToProps (state) {
  return {
    alias: state.user.alias,
    username: state.user.username,
    isYourPage: state.auth.isYourPage
  }
}

export default connect(mapStateToProps, postsActions)(WriteBox);
