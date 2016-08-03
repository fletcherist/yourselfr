import React, { Component, PropTypes } from 'react'
import s from './Counters.scss'
import { Link } from 'react-router'
import { cpEnding } from '../Toools'
import Translate from 'react-translate-component'

import { Tabs, Tab } from 'material-ui/Tabs'

import Eye from 'material-ui/svg-icons/image/remove-red-eye'
import Hearing from 'material-ui/svg-icons/AV/hearing'
import People from 'material-ui/svg-icons/social/people-outline'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { palette } from 'store/config'
const tab = {
  color: palette.yoColor,
  fontSize: 22
}

class Counters extends Component {
  static propTypes = {
    visits: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    alias: PropTypes.string.isRequired
  };

  constructor () {
    super()
    this.state = {
      slideIndex: 0
    }
  }

  componentWillUpdate () {
    return false
  }

  handleChange = (value) => {
    const { dispatch, alias } = this.props
    switch (value) {
      case 0: dispatch(push(`/${alias}`)); break
      case 1: dispatch(push(`/${alias}/followers`)); break
      case 2: dispatch(push(`/${alias}/following`)); break
    }

    this.setState({
      slideIndex: value
    })

    this.forceUpdate()
  }

  render () {
    var pronounce = {
      visits: cpEnding(this.props.visits, 'counters.visits'),
      followers: cpEnding(this.props.followers, 'counters.followers'),
      following: cpEnding(this.props.following, 'counters.following')
    }
    const { visits, followers, following } = this.props
    var userLink = `/${this.props.alias}`
    var followersLink = `/${this.props.alias}/followers`
    var followingLink = `/${this.props.alias}/following`
    return (
      <div className={s.counters}>
        <div className={s.counter}>
          <div className={s.counter_title}>
            <Translate content={pronounce.visits} />
          </div>
        </div>
        <div className={s.counter}>
          <div className={s.counter_title}>
            <Translate content={pronounce.followers} />
          </div>
        </div>
        <div className={s.counter}>
          <div className={s.counter_title}>
            <Translate content={pronounce.following} />
          </div>
        </div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}>
          <Tab style={tab} value={0} label={visits} />
          <Tab style={tab} label={followers} value={1} />
          <Tab style={tab} label={following} value={2} />
        </Tabs>
      </div>
      )
  }
}

export default connect()(Counters)
