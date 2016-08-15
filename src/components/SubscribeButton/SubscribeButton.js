import React, { Component } from 'react'
import s from './SubscribeButton.scss'

import FlatButton from 'material-ui/FlatButton'
import Favorite from 'material-ui/svg-icons/action/favorite'

class SubscribeButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFollowing: this.props.isFollowing
    }
  }
  componentDidMount () {
    this.setState({isFollowing: this.props.isFollowing})
  }
  render () {
    var { isFollowing } = this.state
    var label = ''
    label = isFollowing ? 'читаю' : 'читать'
    return (
      <div className={this.props.inline ? s.inline : s.subscribe}>
        <FlatButton
          label={label} primary={this.props.isFollowing}
          labelPosition="before"
          onClick={this.subscribe}
          fullWidth
          icon={<Favorite viewBox='0 0 35 25' />} />
      </div>
    )
  }
  subscribe = () => {
    this.props.subscribe(this.props.alias, this.props.updateCounters)
    this.setState({
      isFollowing: !this.state.isFollowing
    })
  }
}
export default SubscribeButton
