import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'store/modules/preferences'
import s from './Remove.scss'

class RemoveAvatar extends Component {
  static propTypes = {
    removeBackground: PropTypes.func.isRequired,
    isRemoved: PropTypes.bool.isRequired
  };

  render () {
    if (this.props.isRemoved) {
      return (
        <div className={s.removedPhoto}>фон успешно удалён</div>
      )
    }

    return (
      <div onClick={() => this.props.removeBackground()} className={s.removePhoto}>удалить фон</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isRemoved: state.isFetching.removeBackground
  }
}
export default connect(mapStateToProps, actions)(RemoveAvatar)
