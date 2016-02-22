import React from 'react';
import s from './Login.scss';
import { Link } from 'react-router';

export const NoAccount = () => {
  return (
    <div className={s.containerBlock}>
      <div>Нет аккаунта? <Link to='/signup'>Регистрация</Link></div>
    </div>
  )
}

export const HaveAccount = () => {
  return (
    <div className={s.containerBlock}>
      Есть аккаунт? <Link to='/login'>Вход</Link>
    </div>
  )
}
