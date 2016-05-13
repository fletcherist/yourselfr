import React, { Component, PropTypes } from 'react';
import s from './Main.scss';
import Slideshow from '../Slideshow/Slideshow.js';
import EndlessFeed from '../EndlessFeed';
import Footer from '../Footer';
// import WantToRegister from './WantToRegister';
import { actions as feed } from '../../redux/modules/endlessFeed';
import { connect } from 'react-redux';
import cp from 'counterpart';
import cx from 'classnames';

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
          <div
            className={s.description}
            dangerouslySetInnerHTML={{__html: cp.translate('description')}}>
          </div>
          <ButtonContainer>
            <AuthenticateButton/>
          </ButtonContainer>
          <div className={cx(s.left, s.left__main)}>
            <EndlessFeed feed={this.props.feed}/>
          </div>
          <Footer/>
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
