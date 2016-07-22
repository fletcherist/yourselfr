import React, { Component, PropTypes } from 'react'
import s from '../AuthComponents.scss'
import { connect } from 'react-redux'
import { logIn } from '../../../store/modules/auth'
import Logotype from '../Logotype'
import { NoAccount } from '../Same'
// import { AuthPack } from 'components/Buttons/SocialButtons'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import Translate from 'react-translate-component'
import cp from 'counterpart'

class LoginForm extends Component {
  static propTypes = {
    isFetching: PropTypes.object.isRequired,
    logIn: PropTypes.func.isRequired,
    continueMessage: PropTypes.string
  }
  invalidLogin () {
    this.login.focus()
  }
  invalidPassword () {
    this.password.value = ''
    this.password.focus()
  }
  logIn (e) {
    e.preventDefault()
    if (this.login.input.value === '') {
      return this.invalidLogin()
    }
    if (this.password.input.value === '') {
      return this.invalidPassword()
    }
    this.props.logIn(this.login.input.value, this.password.input.value)
  }
  render () {
    return (
      <div className={s.loginFormContainer}>
        <Logotype />
        <Translate className={s.titleAction} content='login.message' component='div' />
        <form onSubmit={this.logIn.bind(this)}>
          <TextField
            className='button'
            hintText={cp.translate('login.login')}
            ref={(r) => this.login = r}
          />
          <TextField
            className='button'
            hintText={cp.translate('login.password')}
            type='password'
            ref={(r) => this.password = r}
          />
          <RaisedButton
            disabled={this.props.isFetching.status}
            onClick={this.logIn.bind(this)}
            fullWidth>
            <Translate content='login.button' />
          </RaisedButton>
        </form>
        {this.props.isFetching.message && (
          <div className={s.errorMessage}>
            {this.props.isFetching.message}
          </div>
        )}
        <NoAccount />
      </div>
    )
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
