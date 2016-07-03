import React, { Component, PropTypes } from 'react';
import s from './Counters.scss';
import { Link } from 'react-router';
import { cpEnding } from '../Toools';
import Translate from 'react-translate-component';
import cx from 'classnames';

class Counters extends Component {
  static propTypes = {
    visits: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    alias: PropTypes.string.isRequired
  };

  componentWillMount () {
    var type;
    var path = window.location.pathname;
    if (path.match('followers')) {
      type = 1;
    } else if (path.match('following')) {
      type = 2;
    }
    var followersStyle = type === 1 ? 'rgb(246, 246, 246)' : '';
    var followingStyle = type === 2 ? 'rgb(246, 246, 246)' : '';
    this.setState({
      followersStyle: followersStyle,
      followingStyle: followingStyle
    })
  }

  handleClick (type) {
    // Followers click
    if (type === 1) {
      this.setState({
        followersStyle: 'rgb(246, 246, 246)',
        followingStyle: ''
      })
    } else {
      this.setState({
        followersStyle: '',
        followingStyle: 'rgb(246, 246, 246)'
      })
    }
  }

  render () {
    var pronounce = {
      visits: cpEnding(this.props.visits, 'counters.visits'),
      followers: cpEnding(this.props.followers, 'counters.followers'),
      following: cpEnding(this.props.following, 'counters.following')
    }
    const { visits, followers, following } = this.props;
    var followersLink = `/${this.props.alias}/followers`;
    var followingLink = `/${this.props.alias}/following`;
    return (
      <div className={s.counters}>
        <div className={s.counter}>
          <div className={s.counter_count}>{visits}</div>
          <div className={s.counter_title}><Translate content={pronounce.visits} /></div>
        </div>
        <Link to={followersLink} className={s.counter}
          onClick={() => this.handleClick(1)}
          style={{
            backgroundColor: this.state.followersStyle}}>
          <div className={s.counter_count}>{followers}</div>
          <div className={s.counter_title}><Translate content={pronounce.followers} /></div>
        </Link>
        <Link to={followingLink} className={s.counter}
          onClick={() => this.handleClick(2)}
          style={{
            backgroundColor: this.state.followingStyle}}>
          <div className={s.counter_count}>{following}</div>
          <div className={s.counter_title}><Translate content={pronounce.following} /></div>
        </Link>
      </div>
      );
  }
}
export default Counters;
