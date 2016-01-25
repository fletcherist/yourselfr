import React from 'react';
import s from './UserNavigation.scss';
import {Link} from 'react-router';

class UserNavigation extends React.Component {
    constructor (props) {
      super(props);
      this.displayName = 'UserNavigation';
    }

    render () {
        // var posts
      return (
            <div className={s.container}>
                <ul className={s.path} >

                    <Link to='preferences'>
                        <li>настройки </li>
                    </Link>
                    <Link to='like'>
                        <li>рассказать о профиле в соцсетях</li>
                    </Link>
                </ul>
            </div>
        );
    }
}

export default UserNavigation;
