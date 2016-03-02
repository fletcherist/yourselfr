import React from 'react';
import s from './Preferences.scss';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { loadBackground } from '../../redux/modules/preferences';

let cx = classNames.bind(s);

class UploadAvatar extends React.Component {
  uploadBackground () {
    var photo = this.backgroundForm;
    var fd = new FormData();
    fd.append('file', photo[0].files[0]);
    this.props.loadBackground(fd);
  }
  render () {
    const { isFetching } = this.props;
    return (
      <div className={s.photoRight}>
        <div className={s.backgroundHolder}>
          <button onClick={ () => this.backgroundInput.click() }
          className={cx({background: true})}>
          <div className={s.photoPlus}>+</div>
            {!isFetching.avatar && (
              'ФОН'
            )}
            {isFetching.avatar && (
              '...'
            )}
          </button>
        </div>
        <div>Загрузите фон.</div>

        <form ref={ (r) => this.backgroundForm = r } encType='multipart/form-data' method='post' className='hidden'>
          <input
            type='file'
            onChange={this.uploadBackground.bind(this)}
            name='background'
            id='file-avatar'
            ref={ (r) => this.backgroundInput = r }
          />
        </form>
      </div>
    );
  }
}

UploadAvatar.propTypes = {
  loadBackground: React.PropTypes.func,
  isFetching: React.PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadBackground: (background) => dispatch(loadBackground(background))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
