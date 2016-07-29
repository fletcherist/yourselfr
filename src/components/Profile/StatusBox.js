import React, { Component, PropTypes } from 'react'
import { isNotEmptyString } from '../Toools'
import s from './Profile.scss'

class StatusBox extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired
  };

  shouldComponentUpdate (nextProps) {
    return this.props.status !== nextProps.status
  }

  render () {
    var isStatus = isNotEmptyString(this.props.status)
    return (
      <div>
        {isStatus && (
          <div className='container--left'>
            <div className={s.status}>
              {this.props.status}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default StatusBox
