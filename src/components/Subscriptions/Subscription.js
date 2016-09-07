import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { isValidPhoto, isEmpty, arraysEqual } from '../Toools'
import SubscribeButton from '../SubscribeButton'
import NoFollowers from 'components/NoData/NoFollowers'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'

class Followers extends Component {
  componentWillUpdate (nextProps) {
    return !arraysEqual(this.props.followers, nextProps.followers)
  }

  goToThePage = alias => {
    const { push } = this.props
    setTimeout(() => {
      push(`/${alias}`)
    }, 300)
  }

  renderSubscribeButton (subscription) {
    const { authenticated } = this.props.auth
    const { alias } = subscription
    if (!authenticated) {
      return null
    }
    return (
      <SubscribeButton
        alias={alias}
        isFollowing
        updateCounters={false}
        inline />
    )
  }

  renderSubscription (subscription) {
    const { _id, username, alias, photo } = subscription
    console.log(_id, username)
    const photoAvatar = isValidPhoto(photo)
    // const myPageInList = follower._id === myUserId
    return (
      <div>
        <ListItem
          onClick={() => this.goToThePage(alias)}
          key={_id}
          innerDivStyle={{paddingRight: 15}}
          primaryText={username}
          secondaryText={`@${alias}`}
          leftAvatar={<Avatar size={50} src={photoAvatar} />}
          rightIcon={this.renderSubscribeButton(subscription)} />
        <Divider inset />
      </div>
    )
  }

  renderList () {
    console.log('adsasdadsadsadsasdqweewqqwe')
    var subscriptionsList
    const { subscriptions } = this.props
    if (!isEmpty(subscriptions)) {
      const self = this
      subscriptionsList = subscriptions.map(
        subscription => self.renderSubscription(subscription))
      return subscriptionsList
    }

    return (
      <NoFollowers username={this.props.user.username} />
    )
  }

  render () {
    return (
      <div className='container--right padding-0 container--subscriptions'>
        <List>
          {this.renderList()}
        </List>
      </div>
    )
  }
}

Followers.propTypes = {
  followers: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired
}
export default Followers
