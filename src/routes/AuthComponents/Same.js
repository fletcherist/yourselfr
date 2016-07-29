import React from 'react'
import s from './AuthComponents.scss'
import { Link } from 'react-router'
import Translate from 'react-translate-component'

export const NoAccount = () => (
  <div className={s.sameContainer}>
    <Translate content='same.noAccount' />
    {' '}
    <Link to='signup'><b><Translate content='same.register' /></b></Link>
    {
      // <ForgotPassword />
    }
  </div>
)

export const HaveAccount = () => (
  <div className={s.sameContainer}>
    <Translate content='same.haveAccount' />
    {' '}
    <Link to='login'><b><Translate content='same.login' /></b></Link>
  </div>
)

export const ForgotPassword = () => (
  <div className>
    Забыли пароль?
    <Link to='restore'> Восстановить</Link>
  </div>
)
