import React, { Component, PropTypes } from 'react';
import s from './NoData.scss';
import Translate from 'react-translate-component';

class NoPosts extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  shouldComponentUpdate () {
    return false;
  }
  render () {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <div className={s.noData}>
          <Translate content='NoData.NoPosts.authenticated'/>
        </div>
      )
    } else {
      return (
        <div className={s.noData}>
          <Translate content='NoData.NoPosts.not_authenticated'/>
        </div>
      )
    }
  }
}

export default NoPosts;
