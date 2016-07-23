import React, { Component, PropTypes } from 'react'
import { config } from '../../store/config'
import { connect } from 'react-redux'

class Background extends Component {
  static propTypes = {
    background: PropTypes.string
  }
  componentWillMount () {
    this.setState({
      background: '',
      filter: ''
    })
    this.setBackground()
  }
  componentWillReceiveProps () {
    setTimeout(something => {
      this.setBackground()
    }, 300)
  }
  setBackground () {
    console.log(this.props.background)
    var self = this
    if (!this.props.background) {
      self.setState({
        background: ''
      })
      return
    }
    var blurred = `${config.http}/upload/background_blur/${this.props.background}`
    var original = `${config.http}/upload/background/${this.props.background}`

    var imgSmall = new Image()
    imgSmall.src = blurred

    // 2: load large image
    var imgLarge = new Image()
    imgLarge.src = original

    imgSmall.onload = function () {
      self.setState({
        background: blurred,
        filter: 'blur(10px)'
      })

      imgLarge.onload = function () {
        self.setState({
          background: original,
          filter: 'none'
        })
      }
    }
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
          background: `url(${this.state.background})`,
          WebkitFilter: this.state.filter,
          WebkitTransition: '-webkit-filter .8s'
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
