import React, { Component, PropTypes } from 'react'
import s from './User.scss'
import Profile from 'components/Profile'
import Navbar from 'components/Navigation/Navbar'
import Background from 'components/Background'
import Socket from 'components/Socket'
import Counters from 'components/Counters'

class User extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
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
            <Counters />
            {this.props.children}
          </div>
        </div>
        <Socket />
      </div>
    )
  }
}

export default User
