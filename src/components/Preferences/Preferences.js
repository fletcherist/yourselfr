import React from 'react';
import s from './Preferences.scss';
import { connect } from 'react-redux';
import {
  removeAvatar, removeBackground,
  saveAlias, saveUsername, saveStatus
} from '../../redux/modules/preferences';
import { authenticate } from '../../redux/modules/auth';
import classNames from 'classnames/bind';

import UploadAvatar from './UploadAvatar';
import UploadBackground from './UploadBackground';
import UpdateSocialNetworks from './UpdateSocialNetworks';

let cx = classNames.bind(s);

class Preferences extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        username: this.props.username,
        alias: this.props.alias,
        status: this.props.status,

        usernameOld: undefined,
        aliasOld: undefined,
        statusOld: undefined
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
      if (this.state.aliasOld === this.alias.value) {

      } else {
        this.props.saveAlias(this.alias.value)
      }
    }

    handleStatus () {
      if (this.state.statusOld === this.status.value) {

      } else {
        this.props.saveStatus(this.status.value);
      }
    }

    componentWillReceiveProps (props) {
      if (!this.state.username && !this.state.alias && !this.state.status) {
        this.setState({
          username: props.username,
          alias: props.alias,
          status: props.status
        })
      }

      if (!this.state.usernameOld) {
        this.setState({usernameOld: props.username});
      }
      if (!this.state.aliasOld) {
        this.setState({aliasOld: props.alias});
      }
      if (!this.state.statusOld) {
        this.setState({statusOld: props.status});
      }

      console.log(props);
      if (this.props.isFetching.username.state === true) {
        this.setState({usernameOld: this.username.value});
      }
      if (this.props.isFetching.alias.state === true) {
        this.setState({aliasOld: this.alias.value});
      }
      if (this.props.isFetching.status.state === true) {
        this.setState({statusOld: this.status.value});
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
            <div className='container--right'>
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

                <h3>Фотографии</h3>
                <div>
                  <UploadAvatar/>
                  <UploadBackground/>
                  <button onClick={ () => this.props.removeAvatar() } className={cx('button button--upload')}> Удалить аватар </button>
                  <button onClick={ () => this.props.removeBackground() } className={cx('button button--upload')}> Удалить Фон </button>
                </div>

                <div>Социальные сети</div>
                <UpdateSocialNetworks/>
            </div>
        );
    }
}

Preferences.propTypes = {
  username: React.PropTypes.string.isRequired,
  alias: React.PropTypes.string.isRequired,
  status: React.PropTypes.string,
  isFetching: React.PropTypes.object,

  removeAvatar: React.PropTypes.func,
  removeBackground: React.PropTypes.func,

  saveStatus: React.PropTypes.func,
  saveAlias: React.PropTypes.func,
  saveUsername: React.PropTypes.func,

  authenticate: React.PropTypes.func.isRequired
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
