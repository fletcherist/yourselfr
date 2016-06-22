import React, { Component, PropTypes } from 'react';
import s from './Main.scss';
import EndlessFeed from 'components/EndlessFeed';
import Footer from 'components/Footer';
import WantToRegister from '../WantToRegister';
import { actions as feed } from 'store/modules/endlessFeed';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';

// import { ButtonContainer, AuthenticateButton } from 'components/Buttons';
class SignupForm extends Component {
  static propTypes = {
    loadEndlessFeed: PropTypes.func.isRequired,
    feed: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  };
  componentWillMount () {
    this.props.loadEndlessFeed();
  }
  render () {
    return (
      <div className={s.container}>
        <div className={s.logotype}></div>
        <Translate content='description' className={s.description} component='div' />
        <div className={s.left}>
          <WantToRegister />
          <EndlessFeed feed={this.props.feed} isFetching={this.props.isFetching} />
        </div>
        <div className={s.footer__anchor}>
          <Footer />
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    feed: state.feed,
    isFetching: state.isFetching.feed
  }
}
export default connect(mapStateToProps, feed)(SignupForm);
