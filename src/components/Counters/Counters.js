import React, { Component, PropTypes } from 'react'
import s from './Counters.scss'
import { Link } from 'react-router'
import { cpEnding } from '../Toools'
import Translate from 'react-translate-component'

class Counters extends Component {
  render () {
    const { visits, followers, following, alias } = this.props
    var pronounce = {
      visits: cpEnding(visits, 'counters.visits'),
      followers: cpEnding(followers, 'counters.followers'),
      following: cpEnding(following, 'counters.following')
    }
    console.log(visits, following)
    return (
      <div className='container--right padding-0'>
        <Link to={`/${alias}`} className={s.counter}>
          <div className={s.counter_count}>{visits}</div>
          <div className={s.counter_title}>
            <Translate content={pronounce.visits} />
          </div>
        </Link>
        <Link to={`/${alias}/followers`} className={s.counter}>
          <div className={s.counter_count}>{followers}</div>
          <div className={s.counter_title}>
            <Translate content={pronounce.followers} />
          </div>
        </Link>
        <Link to={`/${alias}/following`} className={s.counter}>
          <div className={s.counter_count}>{following}</div>
          <div className={s.counter_title}>
            <Translate content={pronounce.following} />
          </div>
        </Link>
      </div>
      )
  }
}

Counters.propTypes = {
  visits: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  alias: PropTypes.string.isRequired
}

export default Counters
