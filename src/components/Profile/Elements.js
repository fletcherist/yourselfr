import React, { PropTypes } from 'react'
import s from './Profile.scss'
import { Link } from 'react-router'
import { isValidPhoto } from '../Toools'
import Online from 'material-ui/svg-icons/image/lens'

export const Avatar = ({photo, alias}) => (
  <div className={s.avatar}>
    <Link to={`/${alias}`}>
      <img src={isValidPhoto(photo)} />
    </Link>
  </div>
)
Avatar.propTypes = {
  photo: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired
}

export const Username = ({username, online}) => {
  var usernameStyle = {fontSize: 22}
  if (username.length > 15) {
    usernameStyle.fontSize = 18
  }
  let onlineStatus = ''
  if (online) {
    onlineStatus = online.status
      ? <div className={s.online} />
      : null
  }
  return (
    <div className={s.username}>
      <span style={usernameStyle}>{username}</span>
      {onlineStatus}
    </div>
  )
}

export const Status = ({status}) => (
  <div className={s.status}>{status}</div>
)
Status.propTypes = {
  status: PropTypes.string
}
