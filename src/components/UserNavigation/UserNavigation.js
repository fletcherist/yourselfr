import React from 'react';
import s from './UserNavigation.scss';
import {Link} from 'react-router';
import Navigation from '../Navigation';
import { connect } from 'react-redux';
import { config } from '../../redux/config';

const active = {
  backgroundColor: '#f2fdff'
}
class UserNavigation extends React.Component {
    render () {
      var backround = this.props.background
        ? {
          background: `url(${config.http}/upload/background/${this.props.background})`
        }
        : {}
      return (
        <div>
          <div className='responsive_crop_fixed' style={backround}></div>
          <Navigation/>
            <div className={s.container}>
              <ul className={s.path} >
                  <Link to={`/${this.props.alias}`} activeStyle={active} className={s.link}>
                    <div><li>мой профиль </li></div>
                  </Link>
                  <Link to='/preferences' activeStyle={active} className={s.link}>
                    <div><li>мои настройки </li></div>
                  </Link>
                  <Link to='/share-with-social' activeStyle={active} className={s.link}>
                    <div><li>поделиться ссылкой</li></div>
                  </Link>
                  <Link to='/preferences' activeStyle={active} className={s.link}>
                    <div><li>лента </li></div>
                  </Link>
                  <a className={s.link} href='../auth/logout'>
                    <li>выйти</li>
                  </a>
              </ul>
          </div>
        </div>
        );
    }
}

UserNavigation.propTypes = {
  alias: React.PropTypes.string.isRequired,
  background: React.PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    alias: state.auth.user.alias,
    background: state.auth.user.background
  }
}
export default connect(mapStateToProps)(UserNavigation);
