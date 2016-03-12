import React from 'react';
import s from './UserNavigation.scss';
import {Link} from 'react-router';
import Navigation from '../Navigation';
import { connect } from 'react-redux';

const active = {
  backgroundColor: '#f2fdff'
}
class UserNavigation extends React.Component {
    render () {
      return (
        <div>
          <div className='responsive_crop_fixed'></div>
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
  alias: React.PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    alias: state.auth.user.alias
  }
}
export default connect(mapStateToProps)(UserNavigation);
