import React from 'react'
import cx from 'classnames'
import s from './Counters.scss'
import { Link } from 'react-router'
import {ending} from '../Toools'

import { connect } from 'react-redux';

class Counters extends React.Component {

    render () {
      var classes = cx(s.counter, s.counter_divider)

      var pronounce = {
        visits: ending(this.props.visits, ['просмотр', 'просмотра', 'просмотров']),
        followers: ending(this.props.followers, ['подписчик', 'подписчика', 'подписчиков']),
        following: ending(this.props.followers, ['подписка', 'подписок', 'подписки'])
      }

      return (
            <div>
                <div className={classes}>
                    <div className={s.counter_count}>{this.props.visits}</div>
                    <div className={s.counter_title}>{pronounce.visits}</div>
                </div>
                <div className={classes}>
                    <Link to='followers'>
                        <div className={s.counter_count}>{this.props.followers}</div>
                        <div className={s.counter_title}>{pronounce.followers}</div>
                    </Link>
                </div>
                <div className={s.counter}>
                    <Link to='followers'>
                        <div className={s.counter_count}>{this.props.following}</div>
                        <div className={s.counter_title}>{pronounce.following}</div>
                    </Link>
                </div>
            </div>
        );
    }
}

Counters.propTypes = {
  visits: React.PropTypes.number.isRequired,
  followers: React.PropTypes.number.isRequired,
  following: React.PropTypes.number.isRequired
}

function mapStateToProps (state) {
  return {
    visits: state.user.stats.visits,
    followers: state.user.stats.followers,
    following: state.user.stats.following
  }
}

export default connect(mapStateToProps)(Counters);
