import React, { PropTypes } from 'react'
import s from './Profile.scss'
import { Link } from 'react-router'
import { isValidPhoto } from '../Toools'

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
  if (online === true) {
    usernameStyle.color = '#148bc3'
  }
  return (
    <div className={s.username}>
      <span style={usernameStyle}>{username}</span>
      {online === true && (
        <div className={s.online} />
      )}
    </div>
  )
}

export const Status = ({status}) => (
  <div className={s.status}>{status}</div>
)
Status.propTypes = {
  status: PropTypes.string
}
