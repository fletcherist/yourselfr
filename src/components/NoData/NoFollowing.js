import React, { Component, PropTypes } from 'react';
import s from './NoData.scss';
import Translate from 'react-translate-component';

class NoFollowing extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
        <div className={s.noData}>
          <Translate content='NoData.NoFollowing' username={this.props.username}/>
        </div>
    )
  }
}
export default NoFollowing;
