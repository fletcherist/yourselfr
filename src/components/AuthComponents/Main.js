import React from 'react';
import s from './Main.scss';
import Slideshow from '../Slideshow/Slideshow.js';
// import { Link } from 'react-router';
import EndlessFeed from '../EndlessFeed';
import { LocaleSwitcher } from './Same';
import WantToRegister from './WantToRegister';

// import Translate from 'react-translate-component';
// import cp from 'counterpart';

class SignupForm extends React.Component {
  render () {
    return (
      <div>
        <Slideshow />
        <div className={s.container}>
          <div className={s.logotype}></div>
          <div className={s.description}>Сервис анонимных мнений, <br/> позволяющий вполне узнать, <br/> что думают о Вас ваши друзья.</div>
          <div className={s.left}>
            <WantToRegister />
            <EndlessFeed />
          </div>
          <LocaleSwitcher />
        </div>
      </div>
    )
  }
};

export default SignupForm;
