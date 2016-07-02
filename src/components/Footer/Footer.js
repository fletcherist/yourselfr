import React, { Component } from 'react';
import s from './Footer.scss';
import cp from 'counterpart';
import Translate from 'react-translate-component';
import cookie from 'react-cookie';

class Footer extends Component {
  handleChange (locale) {
    cp.setLocale(locale);
    cookie.remove('locale', { path: '/' });
    cookie.save('locale', locale, { path: '/' });
  }

  render () {
    return (
      <div className={s.footer}>
        <span><Translate content='yourselfr'/>, 2016</span>
        {' '}
        <a onClick={ () => this.handleChange('ru')} className={s.footerA}>Русский</a>
        {' '}
        <a onClick={ () => this.handleChange('en')} className={s.footerA}>English</a>
      </div>
    );
  }
}

export default Footer;
