import React from 'react';
import s from './Preferences.scss';
import { connect } from 'react-redux';
import {actions as authActions} from '../../redux/modules/auth';
import cx from 'classnames';

class Preferences extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        username: this.props.username,
        alias: this.props.alias,
        status: this.props.status
      }
    }
    savePreferences () {
      console.log(this.username.value)
      var user = {
        username: this.username.value,
        alias: this.alias.value,
        status: this.status.value
      }

      this.props.savePreferences(user);
    }

    uploadAvatar () {
      var photo = this.avatarForm;
      console.log(photo);
      var fd = new FormData();
      fd.append('file', photo[0].files[0]);

      this.props.loadAvatar(fd);
    }

    uploadBackground () {
      var photo = this.backgroundForm;
      console.log(photo);
      var fd = new FormData();
      fd.append('file', photo[0].files[0]);

      this.props.loadBackground(fd);
    }

    handleUsername () {
      if (this.state.username === this.username.value) {

      } else {
        this.props.saveUsername(this.username.value);
      }
    }

    handleAlias () {
      if (this.state.alias === this.alias.value) {

      } else {
        this.props.saveAlias()
      }
    }

    handleStatus () {
      if (this.state.status === this.status.value) {

      } else {
        this.props.saveStatus();
      }
    }
    render () {
        // var posts
      return (
            <div className='container--right'>
                <h3>имя</h3>

                <input
                  placeholder='любимое моё'
                  defaultValue={this.props.username}
                  className={
                            this.props.isFetching.username
                            ? cx(s.username, s.fetchingForms)
                            : cx(s.username)
                          }
                  onBlur={this.handleUsername.bind(this)}
                  ref={ (r) => this.username = r }
                />
                <h3>адрес страницы</h3>
                <small>поделитесь им с друзьями, чтобы они смогли найти вас</small>
                <input
                  defaultValue={this.props.alias}
                  className={
                            this.props.isFetching.alias
                            ? cx(s.alias, s.fetchingForms)
                            : cx(s.alias)
                          }
                  onBlur={this.handleAlias.bind(this)}
                  ref={ (r) => this.alias = r }
                />
                <h3>о себе</h3>
                <textarea
                  defaultValue={this.props.status}
                  className={
                            this.props.isFetching.status
                            ? cx(s.status, s.fetchingForms)
                            : cx(s.status)
                          }
                  onBlur={this.handleStatus.bind(this)}
                  ref={ (r) => this.status = r }
                />
                <h3>Фотографии</h3>
                <button onClick={ () => this.avatarInput.click() }
                  className={
                            this.props.isFetching.avatar
                            ? cx('button button--upload', s.fetchingForms)
                            : cx('button button--upload')
                          }> Загрузить аватар </button>
                <button onClick={ () => this.backgroundInput.click() }
                className={
                          this.props.isFetching.background
                          ? cx('button button--upload', s.fetchingForms)
                          : cx('button button--upload')}> Загрузить Фон </button>
                <button onClick={ () => this.props.removeAvatar() } className={cx('button button--upload')}> Удалить аватар </button>
                <button onClick={ () => this.props.removeBackground() } className={cx('button button--upload')}> Удалить Фон </button>

                <form ref={ (r) => this.avatarForm = r } encType='multipart/form-data' method='post' className='hidden'>
                  <input
                    type='file'
                    onChange={this.uploadAvatar.bind(this)}
                    name='avatar'
                    id='file-avatar'
                    ref={ (r) => this.avatarInput = r }
                  />
                </form>
                <form ref={ (r) => this.backgroundForm = r } encType='multipart/form-data' method='post' className='hidden'>
                  <input
                    type='file'
                    onChange={this.uploadBackground.bind(this)}
                    name='background'
                    id='file-avatar'
                    ref={ (r) => this.backgroundInput = r }
                  />
                </form>
            </div>
        );
    }
}

Preferences.propTypes = {
  username: React.PropTypes.string.isRequired,
  alias: React.PropTypes.string.isRequired,
  status: React.PropTypes.string,
  savePreferences: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool,

  loadAvatar: React.PropTypes.func,
  loadBackground: React.PropTypes.func,
  removeAvatar: React.PropTypes.func,
  removeBackground: React.PropTypes.func
};

function mapStateToProps (state) {
  return {
    username: state.auth.user.username,
    alias: state.auth.user.alias,
    status: state.auth.user.status,
    isFetching: state.isFetching
  }
}

export default connect(mapStateToProps, authActions)(Preferences);
