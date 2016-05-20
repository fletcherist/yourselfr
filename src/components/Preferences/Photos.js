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

  render () {
    return (
      <div>
        <h3>Фотографии</h3>
        <div>
          <UploadAvatar />
          <UploadBackground />
          <button onClick={() => this.props.removeAvatar()} className='button button--upload'> Удалить аватар </button>
          <button onClick={() => this.props.removeBackground()} className='button button--upload'> Удалить Фон </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, actions)(PreferencesPhotos);
