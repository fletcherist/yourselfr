import React from 'react';
import s from './UserNavigation.scss';
import {Link} from 'react-router';

const active = {
  backgroundColor: '#f2fdff'
}
class UserNavigation extends React.Component {
    render () {
      return (
            <div className='container--left padding-0'>
                <ul className={s.path} >
                    <Link to={`/preferences`} activeStyle={active} className={s.link}>
                        <div><li>настроить профиль </li></div>
                    </Link>
                    <Link to='like' activeStyle={active} className={s.link}>
                        <div><li>поделиться ссылкой на профиль</li></div>
                    </Link>
                    <a href='../auth/logout'>
                        <li>выйти</li>
                    </a>
                </ul>
            </div>
        );
    }
}

UserNavigation.propTypes = {
  alias: React.PropTypes.string.isRequired
}

export default UserNavigation;
