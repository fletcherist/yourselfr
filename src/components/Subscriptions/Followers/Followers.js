import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import s from '../Subscriptions.scss'
import { Link } from 'react-router'

import { isValidPhoto, isEmpty, arraysEqual } from '../../Toools'
import SubscribeButton from '../../SubscribeButton'
import FollowersHeader from '../../Headers/FollowersHeader'
import NoFollowers from 'components/NoData/NoFollowers'
import RenderBackground from '../RenderBackground'

class Followers extends Component {
  static propTypes = {
    followers: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  componentWillUpdate (nextProps) {
    return !arraysEqual(this.props.followers, nextProps.followers)
  }

  renderFollowersList () {
    const isAuthenticated = this.props.auth.authenticated
    const myUserId = this.props.auth.user._id
    const self = this

    var followersList
    if (!isEmpty(this.props.followers)) {
      var followers = this.props.followers
      followersList = followers.map(function (follower) {
        var photo = isValidPhoto(follower.photo)
        const myPageInList = follower._id === myUserId
        return (
          <div key={follower._id}>
            <RenderBackground subscription={follower} />
            <div className={s.container}>
              <Link to={`/${follower.alias}`}>
                <img src={photo} className={s.photo} />
              </Link>
              <div className={s.info}>
                <Link to={`/${follower.alias}`} className={s.username}>
                  {follower.username}
                </Link>
              </div>
              {isAuthenticated && !myPageInList && (
                <div className={s.SubscribeButton}>
                  <SubscribeButton
                    alias={follower.alias}
                    isFollowing={follower.isFollowing}
                    updateCounters={false}
                  />
                </div>
              )}
            </div>
            <div className={s.borderBottom}></div>
          </div>
        )
      })
      return followersList
    }

    return (
      <NoFollowers username={this.props.user.username} />
    )
  }

  render () {
    return (
      <div className='container--right padding-0 container--subscriptions'>
        <FollowersHeader
          alias={this.props.user.alias}
          username={this.props.user.username}
        />
        <div>
          {this.renderFollowersList()}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    followers: state.subscriptions.followers,
    isFetching: state.isFetching.followers,
    auth: state.auth,
    user: state.user
  }
}
export default connect(mapStateToProps)(Followers)
