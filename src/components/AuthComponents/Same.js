import React from 'react';
import s from './AuthComponents.scss';
import { Link } from 'react-router';
import Translate from 'react-translate-component';

export const NoAccount = () => (
  <div className={s.containerBlock}>
    <Translate content='same.noAccount' />
    {' '}
    <Link to='signup'><Translate content='same.register' /></Link>
  </div>
)

export const HaveAccount = () => (
  <div className={s.containerBlock}>
    <Translate content='same.haveAccount' />
    {' '}
    <Link to='login'><Translate content='same.login' /></Link>
  </div>
)
