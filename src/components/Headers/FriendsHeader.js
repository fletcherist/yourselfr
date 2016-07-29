import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import s from './Headers.scss'

class FriendsHeader extends Component {
  static propTypes = {
    alias: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  };

  render () {
    const { alias, username } = this.props
    return (
      <div className={s.blockTitle}>
        <Link to={`/${alias}`} className={s.navLink}>{username}</Link>
        <span className={s.separator}></span>
        <span className={s.navItem}>Друзья Вконтакте</span>
      </div>
    )
  }
}

export default FriendsHeader
