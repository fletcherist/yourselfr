import React from 'react';
import s from './WriteBox.scss';
import { connect } from 'react-redux';
import { actions as postsActions } from '../../redux/modules/posts';
import { config } from '../../redux/config';
import cx from 'classnames';
import Modal from 'react-modal';
// import SmileBox from '../SmileBox';

function formToTray () {
  var form = document.getElementById('textForm');
  form.style.width = '60%';
}

function formToFull () {
  var form = document.getElementById('textForm');
  form.style.width = '100%';
}

class WriteBox extends React.Component {
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
        isOpen: props.show || false,
        textPlaceholder: phrases[random]
      })
    }

    handleSubmitButton (e) {
      var text = this.textBox.value;
      var photo = this.state.photo;
      if (!photo && !text) {
        this.textBox.focus();
      }
      if (/^\s+$/.test(text)) {
        return this.textBox.focus();
      }
      this.props.sendPost(text, photo);
      this.textBox.value = '';
      this.preview.src = '';
      this.preview.classList.add('hidden')
      formToFull();
    }

    selectPhoto (e) {
      this.photoInput.click();
    }

    attachPhoto (e) {
      var photo = this.photoForm;
      console.log(photo);
      var fd = new FormData();
      fd.append('file', photo[0].files[0]);

      var preview = this.preview;
      var reader = new FileReader();

      reader.onload = function () {
        formToTray();
        preview.src = reader.result;
        preview.classList.remove('hidden');
      }

      if (photo[0].files[0]) {
        reader.readAsDataURL(photo[0].files[0]);
      } else {
        console.log('not working');
        preview.src = '';
      }

      fetch(`${config.http}/upload/photo`, {
        method: 'post',
        body: fd
      })
      .then((r) => r.json())
      .then((res) => {
        console.log('its works' + res);
        this.setState({
          photo: res.url
        });
      })
      .catch((e) => {
        console.log('Error catched while attaching a photo', e);
      })
    }

    toggle () {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
    render () {
      var attachPreview = cx(s.attachPreview, 'hidden');
      const customStyles = {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          overflowY: 'hidden'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          border: 'none',
          minWidth: '500px',
          background: 'transparent',
          overflow: 'auto',
          WebkitOverflowScrolling: 'auto',
          marginRight: '-50%',
          transform: 'translate(-51%, -50%)',
          trasnition: 'opacity 0.1s, transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25), -webkit-transform 0.3s cubic-bezier(0.17, -0.65, 0.665, 1.25)'
        }
      };
      return (
        <Modal isOpen={this.state.isOpen} style={customStyles} onRequestClose={this.toggle.bind(this)} closeTimeoutMS={300}>
            <div className={s.container} ref={(r) => this.writeBox = r }>
                <form ref={ (r) => this.photoForm = r } id='attach-photo' encType='multipart/form-data' method='post' className={s.attachForm}>
                    <input type='file' name='photo' onChange={this.attachPhoto.bind(this)} ref={ (r) => this.photoInput = r } id='attach-input' className='attachPhoto-input'/>
                </form>
                <textarea placeholder={this.state.textPlaceholder} id='textForm' ref={(ref) => this.textBox = ref} style={{ visibility: this.state.isOpen ? 'visible' : 'hidden' }}>
                </textarea>
                <img id='attach-preview' ref={(r) => this.preview = r} className={attachPreview}/>
                <div className={s.above}>
                    <div
                        className={cx('button', s.buttonSubmit, s.button)}
                        onClick={this.handleSubmitButton.bind(this)}>
                        отправить
                    </div>
                    {
                      // <div className={s.SmileBoxContainer}>
                        // <SmileBox/>
                      // </div>
                    }
                    <div className={s.photoHolder} onClick={this.selectPhoto.bind(this)}>
                      <div className={s.photoTitle}>прикрепить</div>
                      <div className={s.addPhoto}></div>
                    </div>
                </div>
            </div>
        </Modal>);
    }
}

WriteBox.propTypes = {
  sendPost: React.PropTypes.func.isRequired,
  alias: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  isYourPage: React.PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    alias: state.user.alias,
    username: state.user.username,
    isYourPage: state.auth.isYourPage
  }
}

export default connect(mapStateToProps, postsActions)(WriteBox);
