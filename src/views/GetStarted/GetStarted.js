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
      <div className={s.container}>
        <div className={s.left}>
          <div className={s.navigation}>
            <Navigation />
          </div>
          <h1 className={s.greeting}>Рады вас видеть, {username}.</h1>
          <div className={s.info}>
            <div>Йорселфер — это бесконечный поток мнений о вас.</div>
            <span><b>Читайте</b> мнения о себе и <b>анонимно пишите</b>, что думаете о ваших друзьях. </span>
            <span><b>Подпишитесь</b> на тех людей, мнения о которых вы хотите знать.</span>
          </div>
          <Link to='/i/get-personalized'>
            <div className='button button--block button--material'>Поехали!</div>
          </Link>
        </div>
        <div className={s.right}>
          <img className={s.photo} src={photo1} />
          <img className={s.photo} src={photo2} />
          <img className={s.photo} src={photo3} />
          <img className={s.photo} src={photo4} />
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
