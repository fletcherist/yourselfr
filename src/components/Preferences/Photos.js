<<<<<<< HEAD
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
=======
import React, { Component, PropTypes } from 'react';
import UploadAvatar from './UploadAvatar';
import UploadBackground from './uploadBackground.js';
import { connect } from 'react-redux';
import { actions } from '../../redux/modules/preferences';

class PreferencesPhotos extends Component {
  static propTypes = {
    removeAvatar: PropTypes.func,
    removeBackground: PropTypes.func
  };

>>>>>>> origin/master
  render () {
    return (
      <div>
        <h3>Фотографии</h3>
        <div>
<<<<<<< HEAD
          <div className={s.photoLeft}>
            <UploadAvatar />
            <RemoveAvatar />
          </div>
          <div className={s.photoRight}>
            <UploadBackground />
            <RemoveBackground />
          </div>
=======
          <UploadAvatar/>
          <UploadBackground/>
          <button onClick={ () => this.props.removeAvatar() } className='button button--upload'> Удалить аватар </button>
          <button onClick={ () => this.props.removeBackground() } className='button button--upload'> Удалить Фон </button>
>>>>>>> origin/master
        </div>
      </div>
    )
  }
}

<<<<<<< HEAD
export default PreferencesPhotos;
=======
const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, actions)(PreferencesPhotos);
>>>>>>> origin/master
