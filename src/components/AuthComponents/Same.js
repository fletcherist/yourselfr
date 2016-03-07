import React from 'react';
import s from './Login.scss';
import { Link } from 'react-router';
import cp from 'counterpart';

export const NoAccount = () => {
  return (
    <div className={s.containerBlock}>
      { cp.translate('same.noAccount') }
      {' '}
      <Link to='/signup'>{ cp.translate('same.register') }</Link>
    </div>
  )
}

export const HaveAccount = () => {
  return (
    <div className={s.containerBlock}>
        { cp.translate('same.haveAccount') }
        {' '}
        <Link to='/login'>{ cp.translate('same.login') }</Link>
    </div>
  )
}
