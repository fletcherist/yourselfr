import React from 'react';
import s from './User.scss';
import Profile from '../Profile';
import UserNavigation from '../UserNavigation';

class User extends React.Component {
    constructor (props) {
      super(props);
      this.displayName = 'User';
    }

    render () {
      return (
            <div>
                <div className={s.container}>
                    <div className={s.container_left} id='left'>
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

User.propTypes = {
  children: React.PropTypes.element.isRequired
}
export default User;
