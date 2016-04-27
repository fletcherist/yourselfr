import React, { Component, PropTypes } from 'react';
import s from './Preferences.scss';
import { connect } from 'react-redux';
import {
  removeAvatar, removeBackground,
  saveAlias, saveUsername, saveStatus
} from '../../redux/modules/preferences';
import { authenticate } from '../../redux/modules/auth';
import classNames from 'classnames/bind';
import User from '../User';
import { Link } from 'react-router';
import UploadAvatar from './UploadAvatar';
import UploadBackground from './uploadBackground.js';
// import UpdateSocialNetworks from './UpdateSocialNetworks';

let cx = classNames.bind(s);
export class PreferencesContainer extends Component {
  render () {
    var activeStyle = {
      backgroundColor: '#f2fdff'
    }
    return (
      <User>
        <div className='container--right'>
          <div>
            <div className={s.category}><Link to='/preferences/'>общие</Link></div>
            <div className={s.category}><Link to='/preferences/photos' activeStyle={activeStyle}>фотографии</Link></div>
            <div className={s.category}><Link to='/preferences/social' activeStyle={activeStyle}>социальные сети</Link></div>
          </div>
          {this.props.children}
        </div>
      </User>
    )
  }
}
PreferencesContainer.propTypes = {
  children: React.PropTypes.element.isRequired
}

export class PreferencesPhotos extends Component {
  render () {
    return (
      <div>
        <h3>Фотографии</h3>
        <div>
          <UploadAvatar/>
          <UploadBackground/>
          <button onClick={ () => this.props.removeAvatar() } className={cx('button button--upload')}> Удалить аватар </button>
          <button onClick={ () => this.props.removeBackground() } className={cx('button button--upload')}> Удалить Фон </button>
        </div>
      </div>
    )
  }
}
PreferencesPhotos.propTypes = {
  removeAvatar: React.PropTypes.func,
  removeBackground: React.PropTypes.func
}

class Preferences extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        username: this.props.username,
        alias: this.props.alias,
        status: this.props.status
      };
    }

    componentWillMount () {
      this.props.authenticate();
    }

    handleUsername () {
      if (this.state.usernameOld === this.username.value) {

      } else {
        this.props.saveUsername(this.username.value);
      }
    }

    handleAlias () {
      this.props.saveAlias(this.alias.value)
    }

    handleStatus () {
      this.props.saveStatus(this.status.value);
    }

    componentWillReceiveProps (props) {
      if (!this.state.username && !this.state.alias && !this.state.status) {
        this.setState({
          username: props.username,
          alias: props.alias,
          status: props.status
        })
      }
    }

    handleChange (name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }
    render () {
      const {isFetching} = this.props;
      return (
            <div>
                <h3>имя</h3>
                <input
                  value={this.state.username}
                  onChange={this.handleChange.bind(this, 'username')}
                  className={cx({
                    username: true,
                    fetchingForms: isFetching.username.status,
                    formError: isFetching.username.state === false,
                    formSuccess: isFetching.username.state === true
                  })}
                  onBlur={this.handleUsername.bind(this)}
                  ref={ (r) => this.username = r }
                />
                {isFetching.username.message && (
                  <div className={cx({
                    state: true,
                    success: isFetching.username.state === true,
                    error: isFetching.username.state === false
                  })}>{isFetching.username.message}</div>
                )}

                <h3>адрес страницы</h3>
                <small>поделитесь им с друзьями, чтобы они смогли найти вас</small>
                <input
                  value={this.state.alias}
                  onChange={this.handleChange.bind(this, 'alias')}
                  className={cx({
                    alias: true,
                    fetchingForms: isFetching.alias.status,
                    formError: isFetching.alias.state === false,
                    formSuccess: isFetching.alias.state === true
                  })}
                  onBlur={this.handleAlias.bind(this)}
                  ref={ (r) => this.alias = r }
                />
                {isFetching.alias.message && (
                  <div className={cx({
                    state: true,
                    success: isFetching.alias.state === true,
                    error: isFetching.alias.state === false
                  })}>{isFetching.alias.message}</div>
                )}
                <h3>о себе</h3>
                <textarea
                  value={this.state.status}
                  onChange={this.handleChange.bind(this, 'status')}
                  className={cx({
                    status: true,
                    fetchingForms: isFetching.status.status,
                    formError: isFetching.status.state === false,
                    formSuccess: isFetching.status.state === true
                  })}
                  onBlur={this.handleStatus.bind(this)}
                  ref={ (r) => this.status = r }
                />
                {isFetching.status.message && (
                  <div className={cx({
                    stateStatus: true,
                    success: isFetching.status.state === true,
                    error: isFetching.status.state === false
                  })}>{isFetching.status.message}</div>
                )}
            </div>
        );
    }
}

Preferences.propTypes = {
  username: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  status: PropTypes.string,
  isFetching: PropTypes.object,

  saveStatus: PropTypes.func,
  saveAlias: PropTypes.func,
  saveUsername: PropTypes.func,

  authenticate: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {
    username: state.auth.user.username,
    alias: state.auth.user.alias,
    status: state.auth.user.status,
    isFetching: state.isFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    removeAvatar: () => dispatch(removeAvatar()),
    removeBackground: () => dispatch(removeBackground()),

    saveUsername: (username) => dispatch(saveUsername(username)),
    saveAlias: (alias) => dispatch(saveAlias(alias)),
    saveStatus: (status) => dispatch(saveStatus(status)),

    authenticate: () => dispatch(authenticate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
