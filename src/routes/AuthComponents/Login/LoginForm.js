import React, { Component, PropTypes } from 'react';
import s from '../AuthComponents.scss';
import { connect } from 'react-redux';
import { logIn } from '../../../store/modules/auth';
import { AuthPack } from 'components/Buttons/SocialButtons';
import Logotype from '../Logotype';
import { NoAccount } from '../Same';

import Translate from 'react-translate-component';
import cp from 'counterpart';

class LoginForm extends Component {
  static propTypes = {
    isFetching: PropTypes.object.isRequired,
    logIn: PropTypes.func.isRequired,
    continueMessage: PropTypes.string
  };
  invalidLogin () {
    this.login.focus();
  }
  invalidPassword () {
    this.password.value = '';
    this.password.focus();
  }
  logIn (e) {
    e.preventDefault();
    if (this.login.value === '') {
      return this.invalidLogin();
    }
    if (this.password.value === '') {
      return this.invalidPassword();
    }
    this.props.logIn(this.login.value, this.password.value);
  }
  render () {
    return (
      <div>
        <div className={s.loginFormContainer}>
          <Logotype />
          <AuthPack />
          <Translate className={s.titleAction} content='login.message' component='div' />
          <form onSubmit={this.logIn.bind(this)}>
            <div className='input--container'>
              <input className='input--form input--block' placeholder={cp.translate('login.login')}
                ref={(r) => this.login = r} />
            </div>
            <div className='input--container'>
              <input className='input--form input--block' type='password' placeholder={cp.translate('login.password')}
                ref={(r) => this.password = r} />
            </div>
            <button
              type='submit'
              className='button button--register button--block button--container'
              disabled={this.props.isFetching.status}>
              <Translate content='login.button' />
            </button>
          </form>
          {this.props.isFetching.message && (
            <div className={s.errorMessage}>
              {this.props.isFetching.message}
            </div>
          )}
          <NoAccount />
        </div>
      </div>
    )
  }
};
const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching.logIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (login, password) => dispatch(logIn(login, password))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
