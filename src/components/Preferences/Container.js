import React, { Component, PropTypes } from 'react'
// import { Link } from 'react-router'
// import s from './Preferences.scss'
import User from 'routes/User/containers/User'

import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import Preferences from './Preferences'
import Photos from './Photos'
import SocialNetworks from './UpdateSocialNetworks'

import { push } from 'react-router-redux'
import { connect } from 'react-redux'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10,
    minHeight: 400,
    overflowY: 'hidden'
  }
}

const _preferences = {
  default: '/preferences',
  photos: '/preferences/photos',
  social: '/preferences/social'
}

export class PreferencesContainer extends Component {
  constructor (props) {
    super(props)
    let slideIndex = 0

    switch (document.location.pathname) {
      case _preferences.default: slideIndex = 0; break
      case _preferences.photos: slideIndex = 1; break
      case _preferences.social: slideIndex = 2; break
      default: slideIndex = 0; break
    }
    this.state = { slideIndex: slideIndex }

    this.listener = this.listener.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.listener)
  }
  componentWillUnmount () {
    window.removeEventListener('keydown', this.listener)
  }
  listener (e) {
    let slideIndex = this.state.slideIndex
    switch (e.keyCode) {
      case 39: slideIndex += 1; break
      case 37: slideIndex -= 1; break
      default: slideIndex = 0; break
    }
    if (slideIndex > 2) {
      slideIndex = 2
    }
    if (slideIndex < 0) {
      slideIndex = 0
    }

    this.handleChange(slideIndex)
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })

    const { dispatch } = this.props
    switch (value) {
      case 0: dispatch(push(_preferences.default)); break
      case 1: dispatch(push(_preferences.photos)); break
      case 2: dispatch(push(_preferences.social)); break
      default: dispatch(push(_preferences.default)); break
    }
  }

  render () {
    var activeStyle = {
      backgroundColor: '#f2fdff',
      boxShadow: '0px 3px 0px 0px #179cde',
      paddingTop: '6.5px',
      paddingBottom: '6.5px'
    }
    return (
      <User>
        <div className='container--right relative padding-0'>
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}>
            <Tab label='общие' value={0} />
            <Tab label='фото' value={1} />
            <Tab label='соцсети' value={2} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}>
            <div style={styles.slide}>
              <Preferences />
            </div>
            <div style={styles.slide}>
              <Photos />
            </div>
            <div style={styles.slide}>
              <SocialNetworks />
            </div>
          </SwipeableViews>
        </div>
      </User>
    )
  }
}
export default connect()(PreferencesContainer)
