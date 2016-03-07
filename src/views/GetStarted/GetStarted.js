import React from 'react';
import cx from 'classnames';
import s from './GetStarted.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Navigation from 'components/Navigation';

import photo1 from './photo1.jpg';
import photo2 from './photo2.jpg';
import photo3 from './photo3.jpg';
import photo4 from './photo4.jpg';
// import photo5 from './photo6.jpg';

class GetStarted extends React.Component {
  render () {
    const { username } = this.props.user;
    return (
      <div>
        <Navigation/>
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
              Расскажите друзьям о том, что вы есть на Йорселфере, и мы поможем сделать <br/> ваш профиль популярнее.
            </div>
            <Link to='/i/get-personalized'>
              <button className={cx('button', s.button)}>Продолжить!</button>
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

GetStarted.propTypes = {
  user: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted);
