import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'store/modules/preferences'
import s from './Remove.scss'

class RemoveAvatar extends Component {
  static propTypes = {
    removeAvatar: PropTypes.func.isRequired,
    isRemoved: PropTypes.bool.isRequired
  };

  render () {
    if (this.props.isRemoved) {
      return (
        <div className={s.removedPhoto}>фото успешно удалено</div>
      )
    }

    return (
      <div onClick={() => this.props.removeAvatar()} className={s.removePhoto}>удалить аватар профиля</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isRemoved: state.isFetching.removeAvatar
  }
}
export default connect(mapStateToProps, actions)(RemoveAvatar)
