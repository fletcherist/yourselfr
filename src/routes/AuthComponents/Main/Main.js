import React, { Component, PropTypes } from 'react';
import s from './Main.scss';
import EndlessFeed from 'components/EndlessFeed';
import Footer from 'components/Footer';
import WantToRegister from '../WantToRegister';
import { actions as feed } from 'store/modules/endlessFeed';
import { connect } from 'react-redux';
import SignupForm from '../Signup/SignupForm';
// import Translate from 'react-translate-component';

// import { ButtonContainer, AuthenticateButton } from 'components/Buttons';
class Main extends Component {
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
        <div className={s.wrap}>
          <div className={s.left}>
            <SignupForm />
            <Footer />
          </div>
          <div className={s.right}>
            <WantToRegister />
            <EndlessFeed feed={this.props.feed} isFetching={this.props.isFetching} />
          </div>
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
export default connect(mapStateToProps, feed)(Main);
