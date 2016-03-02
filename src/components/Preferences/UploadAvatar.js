import React from 'react';
import s from './Preferences.scss';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { loadAvatar } from '../../redux/modules/preferences';

let cx = classNames.bind(s);

class UploadAvatar extends React.Component {
  uploadAvatar () {
    var photo = this.avatarForm;
    var fd = new FormData();
    fd.append('file', photo[0].files[0]);
    this.props.loadAvatar(fd);
  }
  render () {
    const { isFetching } = this.props;
    return (
      <div className={s.photoLeft}>
        <div className={s.avatarHolder}>
          <button onClick={ () => this.avatarInput.click() }
            className={cx({avatar: true})}>
              <div className={s.photoPlus}>+</div>
              {!isFetching.avatar && (
                'ФОТО'
              )}
              {isFetching.avatar && (
                '...'
              )}
            </button>
        </div>
        <div>Добавьте фото профиля.</div>
        <form ref={ (r) => this.avatarForm = r } encType='multipart/form-data' method='post' className='hidden'>
          <input
            type='file'
            onChange={this.uploadAvatar.bind(this)}
            name='avatar'
            id='file-avatar'
            ref={ (r) => this.avatarInput = r }
          />
        </form>
      </div>
    );
  }
}

UploadAvatar.propTypes = {
  loadAvatar: React.PropTypes.func,
  isFetching: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadAvatar: (avatar) => dispatch(loadAvatar(avatar))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
