import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { actions as feed } from 'store/modules/endlessFeed'
import s from './Headers.scss'

import Toggle from 'material-ui/Toggle'

class FeedHeader extends Component {
  static propTypes = {
    alias: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    loadEndlessFeed: PropTypes.func.isRequired,
    loadFeed: PropTypes.func.isRequired
  }
  constructor () {
    super()
    this.state = {
      selected: 1
    }
  }

  componentWillMount () {
    if (this.state.selected === 2) {
      this.props.loadEndlessFeed()
    } else {
      this.props.loadFeed()
    }
  }
  changeSelector () {
    // if (selector === this.state.selected) return false
    var selector = this.state.selected
    if (selector === 1) selector = 2
    else selector = 1
    this.setState({
      selected: selector
    })
    if (this.state.selected === 1) this.props.loadEndlessFeed()
    else this.props.loadFeed()
  }

  render () {
    const { alias, username } = this.props
    var label = 'твоя'
    if (this.state.selected === 2) {
      label = 'вся'
    }
    return (
      <div className={s.blockTitle}>
        <div className={s.feedUser}>
          <Link to={`/${alias}`} className={s.navLink}>{username}</Link>
          <span className={s.separator}></span>
          <span className={s.navItem}>Лента</span>
        </div>
        <div className={s.pick}>
          <Toggle
            onToggle={() => this.changeSelector()}
            label={label}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}
export default connect(mapStateToProps, feed)(FeedHeader)
