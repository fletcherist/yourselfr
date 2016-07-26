import React from 'react'
import { connect } from 'react-redux'
import { subscribe } from '../../store/modules/user'
import s from './SubscribeButton.scss'
import classNames from 'classnames/bind'

let cx = classNames.bind(s)

import FlatButton from 'material-ui/FlatButton'

class SubscribeButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFollowing: this.props.isFollowing
    }
  }
  subscribe () {
    this.props.subscribe(this.props.alias, this.props.updateCounters)
    this.setState({
      isFollowing: !this.state.isFollowing
    })
  }
  componentWillReceiveProps (props) {
    console.log(props)
    this.setState({
      isFollowing: props.isFollowing
    })
  }
  render () {
    var { isFollowing } = this.state
    var label = ''
    if (isFollowing === true) {
      label = 'подписки'
    } else if (isFollowing === false) {
      label = 'подписаться'
    } else {
      label = ''
    }
    return (
      <div className={s.subscribe}>
        <FlatButton
          label={label}
          primary={isFollowing}
          onClick={() => this.subscribe()}
          fullWidth />
      </div>
    )
  }
}

SubscribeButton.propTypes = {
  alias: React.PropTypes.string.isRequired,
  subscribe: React.PropTypes.func.isRequired,
  isFollowing: React.PropTypes.bool.isRequired,
  updateCounters: React.PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribe: (alias, updateCounters) => dispatch(subscribe(alias, updateCounters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeButton)
