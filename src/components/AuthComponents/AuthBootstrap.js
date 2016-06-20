import React, { Component, PropTypes } from 'react';
import Slideshow from '../Slideshow/Slideshow.js';
import Footer from '../Footer';
import SignupForm from './Signup/SignupForm';
import LoginForm from './Login/LoginForm';
import s from './AuthComponents.scss';
import PureMain from './Main';

export class AuthBootstrap extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }
  render () {
    return (
      <div>
        <Slideshow />
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

export const Main = () => (
  <PureMain />
)
