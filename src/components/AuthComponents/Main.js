import React from 'react';
import s from './Main.scss';
import Slideshow from '../Slideshow/Slideshow.js';
import EndlessFeed from '../EndlessFeed';
import { LocaleSwitcher } from './Same';
import WantToRegister from './WantToRegister';
import { actions as feed } from '../../redux/modules/endlessFeed';
import { connect } from 'react-redux';

import { ButtonContainer, AuthenticateButton } from 'components/Buttons';

class SignupForm extends React.Component {
  componentWillMount () {
    this.props.loadEndlessFeed();
  }
  render () {
    return (
      <div>
        <Slideshow />
        <div className={s.container}>
          <div className={s.logotype}></div>
          <div className={s.description}>Сервис анонимных мнений, <br/> позволяющий узнать, <br/> что думают о Вас ваши друзья.</div>
          <ButtonContainer>
            <AuthenticateButton />
          </ButtonContainer>
          <div className={s.left}>
            <WantToRegister />
            <EndlessFeed feed={this.props.feed}/>
          </div>
          <LocaleSwitcher />
        </div>
      </div>
    )
  }
};
SignupForm.propTypes = {
  loadEndlessFeed: React.PropTypes.func.isRequired,
  feed: React.PropTypes.array.isRequired
}
const mapStateToProps = (state) => {
  return {
    feed: state.feed
  }
}
export default connect(mapStateToProps, feed)(SignupForm);
