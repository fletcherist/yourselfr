import React, { Component, PropTypes } from 'react';
import s from './Preferences.scss';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { loadBackground } from '../../store/modules/upload';
import { LoaderSmall } from '../Loader';

let cx = classNames.bind(s);

class UploadBackground extends Component {
  uploadBackground () {
    var photo = this.backgroundForm;
    var fd = new FormData();
    fd.append('file', photo[0].files[0]);
    this.props.loadBackground(fd);
  }
  render () {
    const { isFetching } = this.props;
    const { state, status } = isFetching;

    var icon;
    if (!status) {
      icon = <div className={s.photoPlus}>+</div>
    } else {
      icon = <div className={s.loader}><LoaderSmall /></div>
    }
    if (state === true) {
      icon = <div className={s.checkmark}></div>
    }
    return (
      <div className={s.photoRight}>
        <div className={s.backgroundHolder}>
          <button onClick={() => this.backgroundInput.click()}
            className={cx({
              background: true,
              uploadSuccess: isFetching.state
            })}>
            <div>{icon}</div>
            {!isFetching.status && (
              'ФОН'
            )}
          </button>
        </div>
        <div className={s.descTitle}>Загрузите фон.</div>

        <form ref={(r) => this.backgroundForm = r} encType='multipart/form-data' method='post' className='hidden'>
          <input
            type='file'
            onChange={this.uploadBackground.bind(this)}
            name='background'
            id='file-avatar'
            ref={(r) => this.backgroundInput = r}
          />
        </form>
      </div>
    );
  }
}

UploadBackground.propTypes = {
  loadBackground: PropTypes.func,
  isFetching: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching.background
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadBackground: (background) => dispatch(loadBackground(background))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadBackground);
