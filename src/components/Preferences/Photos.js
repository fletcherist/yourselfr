import React, { Component } from 'react';
import UploadAvatar from './Upload/UploadAvatar';
import UploadBackground from './Upload/UploadBackground';
import RemoveAvatar from './Remove/RemoveAvatar';
import RemoveBackground from './Remove/removeBackground';
import s from './Preferences.scss';

export class AvatarAndBackground extends Component {
  render () {
    return (
      <div style={{height: '150px'}}>
        <div className={s.photoLeft}>
          <UploadAvatar />
        </div>
        <div className={s.photoRight}>
          <UploadBackground />
        </div>
      </div>
    )
  }
}
class PreferencesPhotos extends Component {
  render () {
    return (
      <div>
        <h3>Фотографии</h3>
        <div>
          <div className={s.photoLeft}>
            <UploadAvatar />
            <RemoveAvatar />
          </div>
          <div className={s.photoRight}>
            <UploadBackground />
            <RemoveBackground />
          </div>
        </div>
      </div>
    )
  }
}

export default PreferencesPhotos;
