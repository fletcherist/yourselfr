import React, { Component, PropTypes } from 'react'
import s from '../AuthComponents.scss'
import { connect } from 'react-redux'
import { register } from 'store/modules/auth'

import { isValidEmail } from 'components/Toools'
import { routeActions } from 'react-router-redux'
import Logotype from '../Logotype'
import { HaveAccount } from '../Same'
// import { AuthPack } from 'components/Buttons/SocialButtons'

import Translate from 'react-translate-component'
import cp from 'counterpart'

import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class SignupForm extends Component {
  static propTypes = {
    isFetching: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    routeActions: PropTypes.func.isRequired
  }
  constructor () {
    super()
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
    if (!this.username.input.value || this.username.input.value === '') {
      this.username.focus()
      return false
    }

    this.resetMessage()
    return true
  }
  checkEmail () {
    if (this.email.input.value === '') {
      this.email.focus()
      return false
    }

    if (!isValidEmail(this.email.input.value)) {
      this.email.focus()
      this.setState({
        message: 'Почта введена некорректно.'
      })

      return false
    }

    this.resetMessage()
    return true
  }
  checkPassword () {
    if (this.password.input.value === '') {
      this.password.focus()
      return false
    }

    if (this.password.input.value < 6) {
      this.setState({
        message: 'Минимальная длина пароля — 6 символов'
      })

      return false
    }

    this.resetMessage()
    return true
    // More than 6 symbols.
  }
  register (e) {
    if (this.checkUsername() && this.checkEmail() && this.checkPassword()) {
      this.props.register(
        this.username.input.value,
        this.email.input.value,
        this.password.input.value
      )
      e.preventDefault()
      return false
    }
    e.preventDefault()
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
        <Translate className={s.titleAction} content='signup.benefits' component='div' />
        <form onSubmit={this.register.bind(this)}>
          <Paper zDepth={1}>
            <TextField
              autoFocus
              className='input--ui'
              hintText={cp.translate('signup.username')}
              underlineShow={false}
              ref={(r) => {
                this.username = r
              }}
            />
            <Divider />
            <TextField
              className='input--ui'
              hintText={cp.translate('signup.email')}
              underlineShow={false}
              ref={(r) => this.email = r}
            />
            <Divider />
            <TextField
              className='input--ui'
              hintText={cp.translate('signup.password')}
              underlineShow={false}
              ref={(r) => this.password = r}
            />
          </Paper>
          <RaisedButton
            disabled={this.props.isFetching.status}
            onClick={this.register.bind(this)}
            type='submit'
            fullWidth
            label={<Translate content='signup.button' />} />
          {this.state.message && (
            <div className={s.errorMessage}>
              {this.state.message}
            </div>
          )}
        </form>
        <HaveAccount />
      </div>
    )
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
