import React from 'react';

import User from '../User';
import Profile from '../Profile';
import WriteBox from '../WriteBox';
import Posts from '../Posts';
import UserNavigation from '../UserNavigation';
import Preferences from '../Preferences';

class UserVariations extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;

        var children;
        switch(this.props.type){
            case 'preferences':
                children = (
                    <Preferences
                        username={user.username}
                        alias={user.alias}
                        status={user.status}
                    />
                )

                break;
            case 'user':
                children = (
                    <div>
                        <WriteBox
                            alias={user.alias}
                        />
                        <Posts
                            count={user.stats.posts}
                            alias={user.alias}
                            posts={this.props.posts}

                        />
                    </div>
                )
                break;

        }

        return(
            <div>
                <User
                    user={this.props.user}
                    posts={this.props.posts}
                >
                    {children}
                </User>
            </div>
        );
    }
}
export default UserVariations;