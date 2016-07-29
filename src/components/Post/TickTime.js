import React, { Component, PropTypes } from 'react'
import { timePassed } from '../Toools'

class TickTime extends Component {
  static propTypes = {
    time: PropTypes.string.isRequired
  };

  constructor () {
    super()
    this.timePassed = timePassed
  }

  componentWillUpdate () {
    var time = new Date(this.props.time)
    var hours = time / 1000 / 60 / 60
    if (hours > 1) {
      return false
    }

    console.log(time / 1000 / 60 / 60)
    return true
  }

  tickTime () {
    var time = new Date(this.props.time)
    var timePassed = this.timePassed(time)
    this.setState({
      time: timePassed.pronounce
    })
  }
  componentDidMount () {
    this.loadInterval = setInterval(this.tickTime.bind(this), 1000)
  }
  componentWillUnmount () {
    this.loadInterval && clearInterval(this.loadInterval)
    this.loadInterval = false
  }
  componentWillMount () {
    this.setState({time: ''})
    this.tickTime()
  }

  render () {
    return (
      <span>{this.state.time}</span>
    )
  }
}

export default TickTime
