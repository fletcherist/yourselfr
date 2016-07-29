import React, { Component, PropTypes } from 'react'
import s from '../Preferences.scss'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import { loadAvatar } from 'store/modules/upload'
import { LoaderSmall } from 'components/Loader'

let cx = classNames.bind(s)

class UploadAvatar extends Component {
  uploadAvatar () {
    var photo = this.avatarForm
    var fd = new FormData()
    fd.append('file', photo[0].files[0])
    this.props.loadAvatar(fd)
  }

  render () {
    const { isFetching } = this.props
    const { state, status } = isFetching

    var icon
    if (!status) {
      icon = <div className={s.photoPlus}>+</div>
    } else {
      icon = <div className={s.loader}><LoaderSmall /></div>
    }
    if (state === true) {
      icon = <div className={s.checkmark}></div>
    }
    return (
      <div>
        <div className={s.avatarHolder}>
          <button onClick={() => this.avatarInput.click()}
            className={cx({
              avatar: true,
              uploadSuccess: isFetching.state
            })}>
            <div>{icon}</div>
              {!isFetching.status && (
                'ФОТО'
              )}
          </button>
        </div>
        <div className={s.descTitle}>
          Добавьте фото профиля.
        </div>
        <form ref={(r) => this.avatarForm = r} encType='multipart/form-data' method='post' className='hidden'>
          <input
            type='file'
            onChange={this.uploadAvatar.bind(this)}
            name='avatar'
            id='file-avatar'
            ref={(r) => this.avatarInput = r}
          />
        </form>
      </div>
    )
  }
}

UploadAvatar.propTypes = {
  loadAvatar: PropTypes.func.isRequired,
  isFetching: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching.avatar
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadAvatar: (avatar) => dispatch(loadAvatar(avatar))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar)
