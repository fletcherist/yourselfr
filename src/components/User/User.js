import React from 'react';
import cx from 'classnames';
import s from './User.scss';

import Profile from '../Profile';
import WriteBox from '../WriteBox';
import Posts from '../Posts';
import UserNavigation from '../UserNavigation';
import Preferences from '../Preferences';



class User extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'User';
    }

    render() {
        const {user} = this.props;
        return(
            <div>
                <div className={s.container}>
                    <div className={s.container_left} id="left">
                        <div className={s.container_user}>
                            <Profile/>
                            <UserNavigation/>
                        </div>
                    </div>
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

//<Preferences
//    username={user.username}
//    alias={user.alias}
///>
export default User;
