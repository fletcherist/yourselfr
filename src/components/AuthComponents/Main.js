import React, { Component, PropTypes } from 'react';
import s from './Main.scss';
import Slideshow from '../Slideshow/Slideshow.js';
import EndlessFeed from '../EndlessFeed';
import Footer from '../Footer';
// import WantToRegister from './WantToRegister';
import { actions as feed } from '../../store/modules/endlessFeed';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';

import { ButtonContainer, AuthenticateButton } from 'components/Buttons';

class SignupForm extends Component {
  static propTypes = {
    loadEndlessFeed: PropTypes.func.isRequired,
    feed: PropTypes.array.isRequired
  };
  componentWillMount () {
    this.props.loadEndlessFeed();
  }
  render () {
    return (
      <div>
        <Slideshow />
        <div className={s.container}>
          <div className={s.logotype}></div>
          <Translate content='description' className={s.description} component='div' />
          <ButtonContainer>
            <AuthenticateButton />
          </ButtonContainer>
          <div className={s.left}>
            <EndlessFeed feed={this.props.feed} />
          </div>
          <div className={s.footer__anchor}>
            <Footer />
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    feed: state.feed
  }
}
export default connect(mapStateToProps, feed)(SignupForm);
