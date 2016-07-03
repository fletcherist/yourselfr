import React, { Component, PropTypes } from 'react';
import s from './WriteBox.scss';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { actions as postsActions } from '../../store/modules/posts';
=======
import { actions as postsActions } from '../../redux/modules/posts';
import cx from 'classnames';
>>>>>>> origin/master
import Modal from 'react-modal';
import AttachPhoto from './AttachPhoto';
import ModalStyles from './ModalStyles.js';
import TextBox from '../TextBox';
<<<<<<< HEAD
import SmileBox from '../SmileBox';

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
          <GreetingHeader
            username={this.props.username}
            photo={this.props.photo}
          />
          <TextBox username={this.props.username} />
          <div id='attach-block' className='hidden'>
            <div className={s.plus}>+</div>
            <img id='attach-preview' className={s.attachPreview} />
          </div>
          <div className={s.above}>
            <AttachPhoto />
            <SmileBox />
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

const GreetingHeader = ({username, photo}) => (
  <div className={s.header}>
    <div className={s.left}>
      <img src={photo} className={s.avatar} />
    </div>
    <div className={s.right}>
      <div className={s.greeting}>Привет, я {username}<br /></div>
      <div className={s.action}>Напиши, пожалуйста,<br /> что ты думаешь обо мне.</div>
    </div>
  </div>
)

=======

function formToFull () {
  var form = document.getElementById('text-form');
  form.style.width = '100%';
}

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
      var phrases = [
        `Что вы думаете о ${props.username}?`,
        `Поделись мнением о ${props.username}!`,
        `${props.username} владеет искусством матанализа?`,
        `Когда Вы первый раз познакомились с ${props.username}?`,
        `Расскажите смешную историю с ${props.username}`,
        `Опишите черты лица ${props.username}?`,
        `Сможете рассказать смешную историю с участием ${props.username}?`,
        `Напишите, например, какую музыку любит ${props.username}?`,
        `Вы были с ${props.username} наедине?`,
        `Когда Вы в последний раз виделись с ${props.username}?`,
        `Расскажите, любит ли ${props.username} животных?`,
        `${props.username} — тварь дрожащая или право имеет?`,
        `Расскажите всем, как вы познакомились с ${props.username}?`
      ];
      var random = Math.floor(Math.random() * phrases.length)

      this.setState({
        username: props.username,
        created_by: props.alias,
        text: '',
        isOpen: props.isOpen || false,
        textPlaceholder: phrases[random]
      })
    }

    handleSubmitButton (e) {
      var textBox = document.querySelector('#text-form')
      var photo = document.querySelector('#input-value').value;
      var preview = document.querySelector('#attach-preview');
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
      preview.classList.add('hidden')
      formToFull();
      this.props.toggleModalBox();
    }

    render () {
      var attachPreview = cx(s.attachPreview, 'hidden');
      return (
        <Modal
          isOpen={this.props.isOpen}
          style={ModalStyles}
          onRequestClose={ this.props.toggleModalBox }
          closeTimeoutMS={300}>
            <div className={s.container}>
                <div className={s.header}>Написать анонимное мнение</div>
                <TextBox/>
                <img id='attach-preview' className={attachPreview}/>
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

>>>>>>> origin/master
function mapStateToProps (state) {
  return {
    alias: state.user.alias,
    username: state.user.username,
<<<<<<< HEAD
    photo: state.user.photo,
=======
>>>>>>> origin/master
    isYourPage: state.auth.isYourPage
  }
}

export default connect(mapStateToProps, postsActions)(WriteBox);
