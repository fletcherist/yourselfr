import React from 'react'
import cx from 'classnames/bind'
import s from './Counters.scss'
import { Link } from 'react-router'
import {ending} from '../Toools'

const followersACTIVE = {
  backgroundColor: '#f2fdff'
}
const followingACTIVE = {
  backgroundColor: '#f2fdff'
}
class Counters extends React.Component {
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

                <Link to={`/${this.props.alias}/followers`} className={followersClasses} activeStyle={followersACTIVE}>
                    <div className={s.counter_count}>{this.props.followers}</div>
                    <div className={s.counter_title}>{pronounce.followers}</div>
                </Link>

                <Link to={`/${this.props.alias}/following`} className={followingClasses} activeStyle={followingACTIVE}>
                  <div className={s.counter_count}>{this.props.following}</div>
                  <div className={s.counter_title}>{pronounce.following}</div>
                </Link>
            </div>
        );
    }
}

Counters.propTypes = {
  visits: React.PropTypes.number.isRequired,
  followers: React.PropTypes.number.isRequired,
  following: React.PropTypes.number.isRequired,
  alias: React.PropTypes.string.isRequired
}
export default Counters;
