import React, { Component, PropTypes } from 'react';
import s from '../AuthComponents.scss';
import { connect } from 'react-redux';
import { register } from 'store/modules/auth';

import { isValidEmail } from 'components/Toools';
import { routeActions } from 'react-router-redux';
import Logotype from '../Logotype';
import { HaveAccount } from '../Same';

import Translate from 'react-translate-component';
import cp from 'counterpart';

class SignupForm extends Component {
  static propTypes = {
    isFetching: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    routeActions: PropTypes.func.isRequired
  };
  constructor () {
    super();
    this.state = {
      message: undefined
    }
  }
  resetMessage () {
    this.setState({
      message: undefined
    })
  }

  checkUsername () {
    if (this.username.value === '') {
      this.username.focus();
      return false;
    }

    this.resetMessage();
    return true;
  }
  checkEmail () {
    if (this.email.value === '') {
      this.email.focus();
      return false;
    }

    if (!isValidEmail(this.email.value)) {
      this.email.focus();
      this.setState({
        message: 'Почта введена некорректно.'
      });

      return false;
    }

    this.resetMessage();
    return true;
  }
  checkPassword () {
    if (this.password.value === '') {
      this.password.focus();
      return false;
    }

    if (this.password.value < 6) {
      this.setState({
        message: 'Минимальная длина пароля — 6 символов'
      })

      return false;
    }

    this.resetMessage();
    return true;
    // More than 6 symbols.
  }
  register (e) {
    if (this.checkUsername() && this.checkEmail() && this.checkPassword()) {
      this.props.register(this.username.value, this.email.value, this.password.value);
      e.preventDefault();
      return false;
    }
    e.preventDefault();
  }

  componentWillReceiveProps (props) {
    this.setState({
      message: this.props.isFetching.message
    })
  }

  render () {
    return (
      <div className={s.loginFormContainer}>
        <Logotype />
        <Translate content='signup.message' className={s.titleAction} component='div' />
        <form onSubmit={this.register.bind(this)}>
          <div className='input--container'>
            <input className='input--form input--block' placeholder={cp.translate('signup.username')}
              ref={(r) => this.username = r} />
          </div>
          <div className='input--container'>
            <input className='input--form input--block' placeholder={cp.translate('signup.email')}
              ref={(r) => this.email = r} />
          </div>
          <div className='input--container'>
            <input className='input--form input--block' placeholder={cp.translate('signup.password')}
              ref={(r) => this.password = r} />
          </div>
          <button
            type='submit'
            className='button button--register button--block button--container'
            disabled={this.props.isFetching.status}>
            <Translate content='signup.button' />
          </button>
        </form>
        {this.state.message && (
          <div className={s.errorMessage}>
            {this.state.message}
          </div>
        )}
        <HaveAccount />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching.register
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    register: (username, email, password) => dispatch(register(username, email, password)),
    routeActions: () => dispatch(routeActions())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
