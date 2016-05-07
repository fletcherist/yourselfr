import React, { Component, PropTypes } from 'react';
import s from './NoData.scss';

class NoFollowers extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  };
  render () {
    return (
      <div className={s.noData}>У {this.props.username} пока нет ни одного<br/> подписчика</div>
    )
  }
}

export default NoFollowers;
