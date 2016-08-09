import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import s from '../Subscriptions.scss'
import { Link } from 'react-router'

import { isValidPhoto, isEmpty, arraysEqual } from '../../Toools'
import SubscribeButton from '../../SubscribeButton'
import FollowingHeader from '../../Headers/FollowingHeader'
import NoFollowing from 'components/NoData/NoFollowing'
import RenderBackground from '../RenderBackground'

class Following extends Component {
  static propTypes = {
    following: PropTypes.array.isRequired,
    loadFollowing: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.loadFollowing()
  }

  componentWillUpdate (nextProps) {
    return !arraysEqual(this.props.following, nextProps.following)
  }

  render () {
    const isAuthenticated = this.props.auth.authenticated
    const myUserId = this.props.auth.user._id

    var followingList
    if (!isEmpty(this.props.following)) {
      var following = this.props.following
      followingList = following.map(function (following) {
        var photo = isValidPhoto(following.photo)
        var linkHref = '/' + following.alias
        const myPageInList = following._id === myUserId
        return (
          <div>
            <RenderBackground subscription={following} />
            <div key={following._id} className={s.container}>
              <Link to={linkHref}>
                <img src={photo} className={s.photo} />
              </Link>
              <div className={s.info}>
                <Link to={linkHref} className={s.username}>
                  {following.username}
                </Link>
              </div>
              {isAuthenticated && !myPageInList && (
                <div className={s.SubscribeButton}>
                  <SubscribeButton
                    alias={following.alias}
                    isFollowing
                    updateCounters={false}
                  />
                </div>
              )}
            </div>
            {!following.background && (
              <div className={s.borderBottom}></div>
            )}
          </div>
        )
      })
    } else {
      followingList = ''
    }
    return (
      <div className='container--right padding-0 container--subscriptions relative'>
        <FollowingHeader
          alias={this.props.user.alias}
          username={this.props.user.username} />
        <div>
          {followingList && (
            followingList
          )}
          {!followingList && (
            <NoFollowing username={this.props.user.username} />
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    following: state.subscriptions.following,
    isFetching: state.isFetching.following,
    user: state.user,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Following)
