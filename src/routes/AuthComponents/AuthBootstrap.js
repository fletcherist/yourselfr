import React, { Component, PropTypes } from 'react'
import Footer from 'components/Footer'
import SignupForm from './Signup/SignupForm'
import LoginForm from './Login/LoginForm'
// import s from './AuthComponents.scss'
// import Slideshow from 'components/Slideshow'

export class AuthBootstrap extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
export const Signup = () => (
  <div>
    <SignupForm />
    <Footer />
  </div>
)

export const Login = () => (
  <div>
    <LoginForm />
    <Footer />
  </div>
)
