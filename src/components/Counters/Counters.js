import React from 'react'
import cx from 'classnames/bind'
import s from './Counters.scss'
import { Link } from 'react-router'
import {ending} from '../Toools'

// const followersACTIVE = {
//   backgroundPosition: 'right bottom'
// }
// const followingACTIVE = {
//   backgroundPosition: 'left bottom'
// }
class Counters extends React.Component {
    render () {
      var pronounce = {
        visits: ending(this.props.visits, ['пост', 'поста', 'постов']),
        followers: ending(this.props.followers, ['подписчик', 'подписчика', 'подписчиков']),
        following: ending(this.props.following, ['подписка', 'подписки', 'подписок'])
      }

      // var followersClasses = cx('stats__item', s.followersCounter);
      // var followingClasses = cx('stats__item', s.followingCounter);

      const { posts, followers, following } = this.props.stats;
      return (
        <div className="user__stats stats">
          <div className="stats__item">
            <div className="stats__count">{posts}</div>
            <div className="stats__title">{pronounce.visits}</div>
          </div>
          <div className="stats__item">
            <div className="stats__count">{followers}</div>
            <div className="stats__title">{pronounce.followers}</div>
          </div>
          <div className="stats__item">
            <div className="stats__count">{following}</div>
            <div className="stats__title">{pronounce.following}</div>
          </div>
        </div>
      );
    }
}
// <div className='user__stats stats'>
//     <div className='stats__item'>
//         <div className='stats__count'>{this.props.visits}</div>
//         <div className='stats__title'>{pronounce.visits}</div>
//     </div>
//
//     <Link to={`/${this.props.alias}/followers`} className={followersClasses} activeStyle={followersACTIVE}>
//         <div className='stats__count'>{this.props.followers}</div>
//         <div className='stats__title'>{pronounce.followers}</div>
//     </Link>
//
//     <Link to={`/${this.props.alias}/following`} className={followingClasses} activeStyle={followingACTIVE}>
//       <div className='stats__count'>{this.props.following}</div>
//       <div className='stats__title'>{pronounce.following}</div>
//     </Link>
// </div>


Counters.propTypes = {
  stats: React.PropTypes.object.isRequired,
  alias: React.PropTypes.string.isRequired
}
export default Counters;
