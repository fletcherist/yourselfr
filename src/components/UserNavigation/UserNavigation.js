import React from 'react';
import s from './UserNavigation.scss';
import {Link} from 'react-router';

class UserNavigation extends React.Component {
    render () {
      return (
            <div className={s.container}>
                <ul className={s.path} >

                    <Link to={`/${this.props.alias}/preferences`}>
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

UserNavigation.propTypes = {
  alias: React.PropTypes.string.isRequired
}

export default UserNavigation;
