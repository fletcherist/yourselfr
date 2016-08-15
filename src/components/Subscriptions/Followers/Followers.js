import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import s from '../Subscriptions.scss'
import { Link } from 'react-router'

import { isValidPhoto, isEmpty, arraysEqual } from '../../Toools'
import SubscribeButton from '../../SubscribeButton'
import FollowersHeader from '../../Headers/FollowersHeader'
import NoFollowers from 'components/NoData/NoFollowers'
// import RenderBackground from '../RenderBackground'

import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'

import Divider from 'material-ui/Divider'
import Favorite from 'material-ui/svg-icons/action/favorite'

class Followers extends Component {
  componentWillUpdate (nextProps) {
    return !arraysEqual(this.props.followers, nextProps.followers)
  }

  renderFollowersList () {
    // const isAuthenticated = this.props.auth.authenticated
    // const myUserId = this.props.auth.user._id
    // const self = this

    var followersList
    if (!isEmpty(this.props.followers)) {
      var followers = this.props.followers
      followersList = followers.map(function (follower) {
        const { id, username, alias } = follower
        var photo = isValidPhoto(follower.photo)
        // const myPageInList = follower._id === myUserId
        return (
          <div>
            <ListItem
              key={id}
              innerDivStyle={{paddingRight: 15}}
              primaryText={username}
              secondaryText={`@${alias}`}
              leftAvatar={<Avatar src={photo} />}
              rightIcon={
                <SubscribeButton
                  alias={alias}
                  isFollowing
                  updateCounters={false}
                  inline />
              } />
            <Divider inset />
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
        <List>
          {this.renderFollowersList()}
        </List>
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

Followers.propTypes = {
  followers: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}
export default connect(mapStateToProps)(Followers)
