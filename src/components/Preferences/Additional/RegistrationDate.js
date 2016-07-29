import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class RegistrationDate extends Component {
  static propTypes = {
    created_at: PropTypes.string.isRequired
  };

  shouldComponentUpdate () {
    return false
  }

  render () {
    if (!this.props.created_at) {
      return (null)
    }
    var date = formatDate(this.props.created_at)
    return (
      <div className='text-grey'>
        вы зарегистрировались:
        {' '}
        <b>{date}</b>
      </div>
    )
  }
}

const formatDate = (date) => {
  if (!date) {
    return false
  }
  date = new Date(date)
  var month = date.getMonth()
  if (month < 10) {
    month = '0' + month
  }
  var day = date.getDate()
  if (date < 10) {
    day = '0' + date
  }
  return (day + '.' + month + '.' + date.getFullYear())
}

const mapStateToProps = (state) => {
  return {
    created_at: state.auth.user.created_at
  }
}

export default connect(mapStateToProps)(RegistrationDate)
