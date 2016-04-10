import React, { Component } from 'react';
import Slideshow from '../Slideshow/Slideshow.js';
import { NoAccount, HaveAccount, LocaleSwitcher } from './Same';
import SignupForm from './Signup/SignupForm';
import LoginForm from './Login/LoginForm';
import s from './AuthComponents.scss';
export class Signup extends Component {
  render () {
    return (
      <div>
        <Slideshow />
        <div className={s.formBlock}>
          <SignupForm />
          <HaveAccount/>
          <LocaleSwitcher/>
        </div>
      </div>
    )
  }
}

export class Login extends Component {
  render () {
    return (
      <div>
        <Slideshow />
        <div className={s.formBlock}>
          <LoginForm />
          <NoAccount/>
          <LocaleSwitcher/>
        </div>
      </div>
    )
  }
}
