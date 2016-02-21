import React from 'react';
import s from './Login.scss';
import { connect } from 'react-redux';
import EndlessFeed from '../EndlessFeed';
import { logIn } from '../../redux/modules/auth';
import { Link } from 'react-router';

class Login extends React.Component {
  render () {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.left}>
            <div className={s.title}>Мнения о Ваших друзьях. <br/> В реальном времени.</div>
            <div className={s.feedBox}>
              <EndlessFeed/>
            </div>
          </div>
          <div className={s.right}>
            <LoginForm/>
          </div>
        </div>
      </div>
    );
  }
}

class LoginForma extends React.Component {
  render () {
    return (
      <div>
        <div className={s.loginFormContainer}>
          <div className={s.logotype}></div>
          <div>Войдите, чтобы узнать, что думают от Вас ваши друзья.</div>
          <div className='input--container'>
            <input className='input--form input--block' placeholder='Имя пользователя' />
          </div>
          <div className='input--container'>
            <input className='input--form input--block' placeholder='Пароль' type='password'/>
          </div>
          <button
            className='button button--register button--block button--container'
            disabled={this.props.isFetching}>Войти
          </button>
        </div>
        <NoAccount/>
      </div>
    )
  }
};

const NoAccount = () => {
  return (
    <div className={s.containerBlock}>
      <div>Нет аккаунта? <Link to='/signup'>Регистрация</Link></div>
    </div>
  )
}

const haveAccount = () => {
  return(
    <div>Есть аккаунт? <Link to='/login'>Вход</Link></div>
  )
}

LoginForma.propTypes = {
  isFetching: React.PropTypes.bool.isRequired,
  logIn: React.PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.isFetching.logIn
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logIn: () => dispatch(logIn())
  }
}
const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForma);

export default Login;
