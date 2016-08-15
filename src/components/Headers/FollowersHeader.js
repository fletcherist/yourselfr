import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import s from './Headers.scss'
import Subheader from 'material-ui/Subheader'

class FollowersHeader extends Component {
  render () {
    const { alias, username } = this.props
    return (
      <Subheader>Подписчики {' '}
        {username}
      </Subheader>
    )
  }
}

FollowersHeader.propTypes = {
  alias: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}
export default FollowersHeader
