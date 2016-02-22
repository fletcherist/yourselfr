import React from 'react';
import s from './Login.scss';
import { connect } from 'react-redux';
import { logIn } from '../../redux/modules/auth';
import { HaveAccount } from './Same';

class SignupForm extends React.Component {
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

SignupForm.propTypes = {
  isFetching: React.PropTypes.object.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
