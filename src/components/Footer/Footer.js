import React, { Component } from 'react';
import s from './Footer.scss';
import cp from 'counterpart';
import Translate from 'react-translate-component';

class Footer extends Component {
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

export default Footer;
