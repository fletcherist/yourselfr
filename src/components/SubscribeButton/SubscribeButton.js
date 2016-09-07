import React, { Component } from 'react'
import s from './SubscribeButton.scss'

import FlatButton from 'material-ui/FlatButton'

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
    label = isFollowing ? 'подписки' : 'подписаться'
    return (
      <div className={this.props.inline ? s.inline : s.subscribe}>
        <FlatButton
          style={{
            border: '2px solid',
            backgroundColor: 'white',
            padding: 0,
            margin: 0,
            minWidth: 160,
            textTransform: 'lowercase'
          }}
          className={s.subscribe}
          primary={this.props.isFollowing}
          onClick={this.subscribe}
          label={label}
          fullWidth />
      </div>
    )
  }
  subscribe = (e) => {
    this.props.subscribe(this.props.alias, this.props.updateCounters)
    this.setState({
      isFollowing: !this.state.isFollowing
    })
  }
}
export default SubscribeButton
