import React, { Component, PropTypes } from 'react';
import Slideshow from 'components/Slideshow';
import Footer from 'components/Footer';
import SignupForm from './Signup/SignupForm';
import LoginForm from './Login/LoginForm';
import s from './AuthComponents.scss';

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
  <div className={s.formBlock}>
    <SignupForm />
    <Footer />
  </div>
)

export const Login = () => (
  <div className={s.formBlock}>
    <LoginForm />
    <Footer />
  </div>
)
