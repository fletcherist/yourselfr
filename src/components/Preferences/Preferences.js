import React from 'react';
import s from './Preferences.scss';
import { connect } from 'react-redux';
import {actions as authActions} from '../../redux/modules/auth';
import { config } from '../../redux/config';

class Preferences extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        saveMessage: this.props.isFetching === true ? 'Сохранить' : 'Сохраняю..'
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
      var avatar = document.getElementById('avatar');
      avatar.submit();
    }

    uploadBackground () {
      var background = document.getElementById('background');
      background.submit();
    }

    render () {
        // var posts
      return (
            <div className='container--right'>
                <h3>имя</h3>

                <input
                  placeholder='любимое моё'
                  defaultValue={this.props.username}
                  className={s.username}
                  ref={ (r) => this.username = r }
                />
                <h3>адрес страницы</h3>
                <small>поделитесь им с друзьями, чтобы они смогли найти вас</small>
                <input
                  defaultValue={this.props.alias}
                  className={s.alias}
                  ref={ (r) => this.alias = r }
                />
                <h3>о себе</h3>
                <div>
                    <textarea
                      defaultValue={this.props.username}
                      className={s.status}
                      ref={ (r) => this.status = r }
                    />
                </div>
                <button className={s.savePreferences}
                        onClick={this.savePreferences.bind(this)}>
                        {this.state.saveMessage}
                </button>

            </div>
        );
    }
}

// <form id='avatar' action={`${config.http}/upload/avatar`} encType='multipart/form-data' method='post'>
//   <input type='file' onChange={this.uploadAvatar.bind(this)} name='avatar' id='file-avatar'/>
// </form>
// <form id='background' action={`${config.http}/upload/background`} encType='multipart/form-data' method='post'>
//   <input type='file' onChange={this.uploadBackground.bind(this)} name='background' id='file-avatar'/>
// </form>

Preferences.propTypes = {
  username: React.PropTypes.string.isRequired,
  alias: React.PropTypes.string.isRequired,
  status: React.PropTypes.string,
  savePreferences: React.PropTypes.func.isRequired,
  startSavingPreferences: React.PropTypes.func,
  isFetching: React.PropTypes.bool,

  loadAvatar: React.PropTypes.func,
  loadBackground: React.PropTypes.func
};

Preferences.defaultProps = {
  isFetching: false
}

function mapStateToProps (state) {
  return {
    username: state.auth.user.username,
    alias: state.auth.user.alias,
    status: state.auth.user.status
  }
}

export default connect(mapStateToProps, authActions)(Preferences);
