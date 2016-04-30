import React, { Component, PropTypes } from 'react';
import cx from 'classnames/bind';
import s from './Counters.scss';
import { Link } from 'react-router';
import {ending} from '../Toools';

const active = {
  backgroundColor: 'rgb(246, 246, 246)'
}
class Counters extends Component {
  static propTypes = {
    visits: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    alias: PropTypes.string.isRequired
  };

  render () {
    var pronounce = {
      visits: ending(this.props.visits, ['просмотр', 'просмотра', 'просмотров']),
      followers: ending(this.props.followers, ['подписчик', 'подписчика', 'подписчиков']),
      following: ending(this.props.following, ['подписка', 'подписки', 'подписок'])
    }

    var followersClasses = cx(s.counter, s.followersCounter);
    var followingClasses = cx(s.counter, s.followingCounter);
    return (
          <div>
              <div className={s.counter}>
                  <div className={s.counter_count}>{this.props.visits}</div>
                  <div className={s.counter_title}>{pronounce.visits}</div>
              </div>

              <Link to={`/${this.props.alias}/followers`} className={followersClasses} activeStyle={active}>
                  <div className={s.counter_count}>{this.props.followers}</div>
                  <div className={s.counter_title}>{pronounce.followers}</div>
              </Link>

              <Link to={`/${this.props.alias}/following`} className={followingClasses} activeStyle={active}>
                <div className={s.counter_count}>{this.props.following}</div>
                <div className={s.counter_title}>{pronounce.following}</div>
              </Link>
          </div>
      );
  }
}
export default Counters;
