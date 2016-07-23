import React, { Component, PropTypes } from 'react'
import s from '../AuthComponents.scss'
// import EndlessFeed from 'components/EndlessFeed'
import Footer from 'components/Footer'
// import WantToRegister from '../WantToRegister'
import { actions as feed } from 'store/modules/endlessFeed'
import { connect } from 'react-redux'

import Logotype from '../Logotype'
import Translate from 'react-translate-component'
import { AuthPack } from 'components/Buttons/SocialButtons'

// import { ButtonContainer, AuthenticateButton } from 'components/Buttons'
class Main extends Component {
  static propTypes = {
    loadEndlessFeed: PropTypes.func.isRequired,
    feed: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  }
  componentWillMount () {
    this.props.loadEndlessFeed()
  }
  render () {
    return (
      <div className={s.wrap}>
        <div className={s.loginFormContainer}>
          <Logotype />
          <Translate content='signup.message' className={s.titleAction} component='div' />
          <AuthPack />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    feed: state.feed,
    isFetching: state.isFetching.feed
  }
}
export default connect(mapStateToProps, feed)(Main)
