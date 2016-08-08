import React, { Component, PropTypes } from 'react'
import s from './User.scss'
import Profile from 'components/Profile'
import Navbar from 'components/Navigation/Navbar'
import Background from 'components/Background'
import Socket from 'components/Socket'

class User extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }
  constructor () {
    super()
    let showTabs = this.showTabs()
    this.state = {
      slideIndex: 0,
      showTabs: showTabs
    }
    this.handleChange = this.handleChange.bind(this)
  }

  showTabs () {
    let pathname = document.location.pathname
    var _showTabs = false
    switch (pathname) {
      case '/preferences': _showTabs = false; break
      default: _showTabs = true; break
    }
    return _showTabs
  }

  handleChange (value) {
    this.setState({
      slideIndex: value
    })
  }

  render () {
    return (
      <div>
        <Background />
        <Navbar />
        <div className={s.container}>
          <div className={s.container_left}>
            <Profile />
          </div>
          <div>
            {this.props.children}
          </div>
        </div>
        <Socket />
      </div>
    )
  }
}

export default User
