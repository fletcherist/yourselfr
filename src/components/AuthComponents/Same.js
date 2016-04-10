import React from 'react';
import s from './AuthComponents.scss';
import { Link } from 'react-router';
import cp from 'counterpart';
import Translate from 'react-translate-component';

export const NoAccount = () => {
  return (
    <div className={s.containerBlock}>
      <Translate content='same.noAccount' />
      {' '}
      <Link to='/signup'><Translate content='same.register' /></Link>
    </div>
  )
}

export const HaveAccount = () => {
  return (
    <div className={s.containerBlock}>
        <Translate content='same.haveAccount' />
        {' '}
        <Link to='/login'><Translate content='same.login' /></Link>
    </div>
  )
}

export class LocaleSwitcher extends React.Component {
  handleChange (locale) {
    cp.setLocale(locale);
  }

  render () {
    return (
      <div className={s.footer}>
        <span><a><Translate content='yourselfr'/> © 2016</a></span>
        {' '}
        <a onClick={ () => this.handleChange('ru')} className={s.footerA}>Русский</a>
        {' '}
        <a onClick={ () => this.handleChange('en')} className={s.footerA}>English</a>
      </div>
    );
  }
}
