<<<<<<< HEAD
import React, { PropTypes } from 'react';
=======
import React from 'react';
>>>>>>> origin/master
import s from './Profile.scss';
import { Link } from 'react-router';
import { isValidPhoto } from '../Toools';

export const Avatar = ({photo, alias}) => (
<<<<<<< HEAD
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
    usernameStyle.fontSize = 18;
  }
  if (online === true) {
    usernameStyle.color = '#148bc3';
  }
  console.log('online +  ' + online);
  return (
    <div className={s.username}>
      <span style={usernameStyle}>{username}</span>
      {online === true && (
        <div className={s.online} />
      )}
    </div>
  )
}
Username.propTypes = {
  username: PropTypes.string.isRequired,
  online: PropTypes.bool
}
=======
    <div className={s.avatar}>
        <Link to={`/${alias}`}>
            <img src={isValidPhoto(photo)}/>
        </Link>
    </div>
)

export const Username = ({username, online}) => {
  var fontSize = {fontSize: 22}
  if (username.length > 15) {
    fontSize = {fontSize: 18}
  }
  return (
    <div className={s.username}>
        <span style={fontSize}>{username}</span>
        {online === true && (
          <div className={s.online} />
        )}
    </div>
  )
}
>>>>>>> origin/master

export const Status = ({status}) => (
  <div className={s.status}>{status}</div>
)
<<<<<<< HEAD
Status.propTypes = {
  status: PropTypes.string
}
=======
>>>>>>> origin/master
