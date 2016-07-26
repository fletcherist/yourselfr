import React, { Component, PropTypes } from 'react'
import { config } from '../../store/config'
import { connect } from 'react-redux'

class Background extends Component {
  static propTypes = {
    background: PropTypes.string
  }
  render () {
    if (!this.props.background) {
      return (
        <div className='responsive_crop_fixed' id='background'></div>
      )
    }
    return (
      <div
        className='responsive_crop_fixed'
        style={{
          background: `url(${config.http}/upload/background/${this.props.background})`
        }}
        id='background'>
      </div>
    )
  }
}

function mapStateToProps (state) {
  if (state.user) {
    return {
      background: state.user.background
    }
  }
  return {}
}
export default connect(mapStateToProps)(Background)
