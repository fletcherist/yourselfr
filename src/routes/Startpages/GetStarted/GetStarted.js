import React, { Component, PropTypes } from 'react'
import s from '../GetSomething.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Navbar from 'components/Navigation/Navbar'
import RaisedButton from 'material-ui/RaisedButton'
import Background from 'components/Background'
import Navigation from 'components/Navigation'

class GetStarted extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }
  render () {
    const { username, alias } = this.props.user
    return (
      <div>
        <Background />
        <Navbar />
        <div className={s.container}>
          <div className={s.middle}>
            <h1 className={s.greeting}>Привет,{' '}
              <Link to={`/${alias}`}>{username}</Link>
            </h1>
            <Navigation active hideLogo center />
            <div className='rate-empty-line-2'></div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(GetStarted)
