import React, { Component, PropTypes } from 'react';
import s from './User.scss';
import Profile from '../Profile';

class User extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    background: PropTypes.string
  };

  render () {
    return (
      <div>
        <div className={s.container}>
          <div className={s.container_left}>
            <Profile />
          </div>
          <div>
              {this.props.children}
          </div>
        </div>
      </div>
      );
  }
}

export default User;
