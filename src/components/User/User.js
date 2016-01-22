import React from 'react';
import cx from 'classnames';
import s from './User.scss';
import withStyles from '../../decorators/withStyles';

import Profile from '../Profile';
import WriteBox from '../WriteBox';
import Posts from '../Posts';
import UserNavigation from '../UserNavigation';
import Preferences from '../Preferences';


@withStyles(s)

class User extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'User';
    }

    static defaultProps = {
        posts: React.PropTypes.shape({
            count: 0,
            posts: []
        })
    }

    render() {
        const {user} = this.props;
        return(
            <div>
                <div className={s.container}>
                    <div className={s.container_left} id="left">
                        <div className={s.container_user}>
                            <Profile 
                                username={user.username}
                                status={user.status}
                                online={user.online.status}
                                visits={user.stats.visits}
                                followers={user.stats.followers}
                                following={user.stats.following}
                            />
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