import React from 'react';
import s from './Profile.scss';
import { Link } from 'react-router';
import { isValidPhoto } from '../Toools';

export const Avatar = ({photo, alias}) => (
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

export const Status = ({status}) => (
  <div className={s.status}>{status}</div>
)
