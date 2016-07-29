import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import s from './Preferences.scss'
import User from 'routes/User/containers/User'

import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'

import Preferences from './Preferences'
import Photos from './Photos'
import SocialNetworks from './UpdateSocialNetworks'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10,
    minHeight: 500,
    overflowY: 'hidden'
  }
}

export class PreferencesContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value
    })
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

// <div>
//   <div className={s.category}>
//     <Link to='/preferences/'>общие</Link>
//   </div>
//   <div className={s.category}>
//     <Link to='/preferences/photos' activeStyle={activeStyle}>
//       фотографии
//     </Link>
//   </div>
//   <div className={s.category}>
//     <Link to='/preferences/social' activeStyle={activeStyle}>
//       социальные сети
//     </Link>
//   </div>
// </div>
// {this.props.children}

export default PreferencesContainer
