import React from 'react';
import s from 'components/Login/Login.scss';
import { connect } from 'react-redux';
import EndlessFeed from 'components/EndlessFeed';
import { logIn } from '../../redux/modules/auth';
import { Link } from 'react-router';

class HomeView extends React.Component {
  render () {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.left}>
            <div className={s.title}>Мнения о ваших друзьях. <br/> В реальном времени.</div>
            <div className={s.feedBox}>
              <EndlessFeed/>
            </div>
          </div>
          <div className={s.right}>
            {this.props.children}
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
          <div className={s.titleAction}>Зарегистрируйтесь, чтобы узнать, что думают от Вас ваши друзья.</div>
          <div className='input--container'>
            <input className='input--form input--block' placeholder='Имя пользователя' />
          </div>
          <div className='input--container'>
            <input className='input--form input--block' placeholder='Эл. Адрес' />
          </div>
          <div className='input--container'>
            <input className='input--form input--block' placeholder='Пароль' type='password'/>
          </div>
          <button
            className='button button--register button--block button--container'
            onClick={ () => this.props.logIn()}
            disabled={this.props.isFetching.status}>Регистрация
          </button>
          {this.props.isFetching.message && (
            <div className={s.errorMessage}>
              {this.props.isFetching.message}
            </div>
          )}
        </div>
        <HaveAccount/>
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

const HaveAccount = () => {
  return(
    <div className={s.containerBlock}>
      <div>Есть аккаунт? <Link to='/login'>Вход</Link></div>
    </div>
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
export const RegisterForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForma);

export default HomeView;
