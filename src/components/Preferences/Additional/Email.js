import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Email extends Component {
  static propTypes = {
    email: PropTypes.string
  };

  shouldComponentUpdate () {
    return false
  }

  render () {
    if (!this.props.email) {
      return (null)
    }
    return (
      <div className='text-grey'>
        адрес электронной почты:
        {' '}
        <b>{this.props.email}</b>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.user.email
  }
}

export default connect(mapStateToProps)(Email)
