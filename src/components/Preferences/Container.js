import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import s from './Preferences.scss';
import User from 'routes/User/containers/User';

export class PreferencesContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    var activeStyle = {
      backgroundColor: '#f2fdff',
      boxShadow: '0px 3px 0px 0px #179cde',
      paddingTop: '6.5px',
      paddingBottom: '6.5px'
    }
    return (
      <User>
        <div className='container--right relative'>
          <div>
            <div className={s.category}><Link to='/preferences/'>общие</Link></div>
            <div className={s.category}><Link to='/preferences/photos' activeStyle={activeStyle}>фотографии</Link></div>
            <div className={s.category}><Link to='/preferences/social' activeStyle={activeStyle}>социальные сети</Link></div>
          </div>
          {this.props.children}
        </div>
      </User>
    )
  }
}

export default PreferencesContainer;
