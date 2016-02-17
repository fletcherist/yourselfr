import React from 'react';
import s from './UserNavigation.scss';
import {Link} from 'react-router';

class UserNavigation extends React.Component {
    render () {
      return (
            <div className='container--left'>
                <ul className={s.path} >
                    <Link to={`/preferences`}>
                        <li>настройки </li>
                    </Link>
                    <Link to='like'>
                        <li>рассказать о профиле в соцсетях</li>
                    </Link>
                    <a href='../auth/logout'>
                        <li>выйти, если вошёл</li>
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
