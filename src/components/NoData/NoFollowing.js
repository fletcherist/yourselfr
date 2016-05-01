import React, { Component, PropTypes } from 'react';
import s from './NoData.scss';

class NoFollowing extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  };

  render () {
    return (
        <div className={s.noSubscriptions}>
          {this.props.username} пока ни на кого <br/> не подписался
        </div>
    )
  }
}
export default NoFollowing;
