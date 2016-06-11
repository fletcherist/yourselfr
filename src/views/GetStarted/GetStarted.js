import React, { Component, PropTypes } from 'react';
import s from '../GetSomething.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navigation from 'components/Navigation';

import photo1 from './photo1.jpg';
import photo2 from './photo2.jpg';
import photo3 from './photo3.jpg';
import photo4 from './photo4.jpg';
// import photo5 from './photo6.jpg';

class GetStarted extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };
  render () {
    const { username } = this.props.user;
    return (
      <div>
        <Navigation />
        <div className={s.container}>
          <div className={s.left}>
            <h1 className={s.greeting}>Рады вас видеть, {username}.</h1>
            <div className={s.info}>
              Йорселфер — это бесконечный поток анонимных мнений о вас:
              ваши друзья могут рассказать о вас и ваших предпочтениях, вкусах, а также даже признаться в любви.

              Получайте анонимные мнения о Вас, а также следите за тем, что думают о Ваших друзьях в ленте.
              Подпишитесь на людей, мнения о которых Вам интересно знать.
            </div>
            <div>
              Расскажите друзьям о том, что вы есть на Йорселфере, и мы поможем сделать <br /> ваш профиль популярнее.
            </div>
            <Link to='/i/get-personalized'>
              <div className={s.button}>Продолжить!</div>
            </Link>
          </div>
          <div className={s.right}>
            <img className={s.photo} src={photo1} />
            <img className={s.photo} src={photo2} />
            <img className={s.photo} src={photo3} />
            <img className={s.photo} src={photo4} />
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

export default connect(mapStateToProps)(GetStarted);
