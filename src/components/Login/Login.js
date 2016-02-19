import React from 'react';
import s from './Login.scss';
import { connect } from 'react-redux';
import EndlessFeed from '../EndlessFeed';

class Login extends React.Component {
  render () {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.left}>
            <EndlessFeed/>
          </div>
          <div className={s.right}>
            <LoginForm/>
          </div>
        </div>
      </div>
    );
  }
}



class LoginForm extends React.Component {
  render () {
    return (
      <div className={s.loginFormContainer}>
        <div className={s.logotype}></div>
        <div className='input--container'>
          <input className='input--form input--block' placeholder='Имя пользователя' />
        </div>
        <div className='input--container'>
          <input className='input--form input--block' placeholder='Пароль' type='password'/>
        </div>
        <button className='button button--register button--block button--container'>Войти</button>
      </div>
    )
  }
}

export default Login;
